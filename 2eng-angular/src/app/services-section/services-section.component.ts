import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HygraphService, ServiceData } from '../services/hygraph.service';
import { ModalService } from '../services/modal.service';

interface CarouselServiceData extends ServiceData {
  activeImageIndex: number;
}

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.scss'
})
export class ServicesSectionComponent implements OnInit, OnDestroy {
  private hygraph = inject(HygraphService);
  private modalService = inject(ModalService);

  services: CarouselServiceData[] = [];
  isLoading = true;
  apiError = false;
  private intervalId: any;

  ngOnInit() {
    this.hygraph.getServices().subscribe({
      next: (data) => {
        this.services = data.map(s => ({ ...s, activeImageIndex: 0 }));
        this.isLoading = false;
        if (data.length === 0) {
          this.apiError = true;
        } else {
          this.startCarousel();
        }
      },
      error: (err) => {
        console.error('Error fetching services:', err);
        this.isLoading = false;
        this.apiError = true;
      }
    });
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startCarousel() {
    if (typeof window !== 'undefined') {
      this.intervalId = setInterval(() => {
        this.services.forEach(service => {
          if (service.images && service.images.length > 1) {
            service.activeImageIndex = (service.activeImageIndex + 1) % service.images.length;
          }
        });
      }, 3500); // changes image every 3.5s
    }
  }

  nextImage(service: CarouselServiceData, event: Event) {
    event.stopPropagation();
    if (service.images && service.images.length > 1) {
      service.activeImageIndex = (service.activeImageIndex + 1) % service.images.length;
    }
  }

  prevImage(service: CarouselServiceData, event: Event) {
    event.stopPropagation();
    if (service.images && service.images.length > 1) {
      service.activeImageIndex = (service.activeImageIndex - 1 + service.images.length) % service.images.length;
    }
  }

  openServiceModal(service: ServiceData) {
    this.modalService.openModal(service);
  }
}

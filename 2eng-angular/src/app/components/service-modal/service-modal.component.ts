import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';
import { ServiceData } from '../../services/hygraph.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-service-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-modal.component.html',
  styleUrl: './service-modal.component.scss'
})
export class ServiceModalComponent implements OnInit, OnDestroy {
  private modalService = inject(ModalService);
  private subs = new Subscription();

  isVisible = false;
  service: ServiceData | null = null;
  
  // Gallery Logic
  currentImageIndex = 0;

  ngOnInit() {
    this.subs.add(
      this.modalService.isVisible$.subscribe(visible => this.isVisible = visible)
    );
    this.subs.add(
      this.modalService.activeService$.subscribe(service => {
        this.service = service;
        this.currentImageIndex = 0; // Reset gallery on open
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  closeModal() {
    this.modalService.closeModal();
  }

  // Infinite Loop Gallery Logic
  nextImage() {
    if (!this.service || !this.service.images || this.service.images.length === 0) return;
    this.currentImageIndex = (this.currentImageIndex + 1) % this.service.images.length;
  }

  prevImage() {
    if (!this.service || !this.service.images || this.service.images.length === 0) return;
    this.currentImageIndex = (this.currentImageIndex - 1 + this.service.images.length) % this.service.images.length;
  }
}

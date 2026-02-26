import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HygraphService, ServiceData } from '../services/hygraph.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.scss'
})
export class ServicesSectionComponent implements OnInit {
  private hygraph = inject(HygraphService);
  private modalService = inject(ModalService);

  services: ServiceData[] = [];
  categories: string[] = ['Engenharia', 'Diagnóstica', 'Manutenção', 'Especiais'];
  selectedCategory = 'Engenharia';
  isLoading = true;
  apiError = false;

  ngOnInit() {
    this.hygraph.getServices().subscribe({
      next: (data) => {
        this.services = data;
        this.isLoading = false;
        if (data.length === 0) {
            this.apiError = true;
        }
      },
      error: (err) => {
          console.error('Error fetching services:', err);
          this.isLoading = false;
          this.apiError = true;
      }
    });
  }

  filterServices(category: string) {
    this.selectedCategory = category;
  }

  get filteredServices() {
    return this.services.filter(service => service.category.toLowerCase() === this.selectedCategory.toLowerCase() || service.category.includes(this.selectedCategory));
  }

  openServiceModal(service: ServiceData) {
    this.modalService.openModal(service);
  }
}

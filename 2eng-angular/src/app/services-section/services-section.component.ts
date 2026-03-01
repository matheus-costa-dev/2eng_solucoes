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

  private normalizeStr(str: string): string {
    return str ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() : '';
  }

  get filteredServices() {
    const selected = this.normalizeStr(this.selectedCategory);
    return this.services.filter(service => {
      const cat = this.normalizeStr(service.category);
      return cat === selected || cat.includes(selected);
    });
  }

  openServiceModal(service: ServiceData) {
    this.modalService.openModal(service);
  }
}

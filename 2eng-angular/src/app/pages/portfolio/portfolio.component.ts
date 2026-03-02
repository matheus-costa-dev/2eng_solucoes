import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesSectionComponent } from '../../services-section/services-section.component';
import { ServiceModalComponent } from '../../components/service-modal/service-modal.component';
import { TestimonialsSectionComponent } from '../../components/testimonials-section/testimonials-section.component';
import { HygraphService } from '../../services/hygraph.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, ServicesSectionComponent, ServiceModalComponent, TestimonialsSectionComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit {
  private hygraph = inject(HygraphService);

  clients: { name: string, logo: { url: string } }[] = [];

  ngOnInit() {
    this.hygraph.getClients().subscribe({
      next: (data) => this.clients = data,
      error: (err) => console.error('Error fetching clients:', err)
    });
  }
}


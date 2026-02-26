import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesSectionComponent } from '../../services-section/services-section.component';
import { ServiceModalComponent } from '../../components/service-modal/service-modal.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, ServicesSectionComponent, ServiceModalComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {}

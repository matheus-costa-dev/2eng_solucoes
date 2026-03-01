import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesSectionComponent } from '../../services-section/services-section.component';
import { ServiceModalComponent } from '../../components/service-modal/service-modal.component';
import { TestimonialsSectionComponent } from '../../components/testimonials-section/testimonials-section.component';
import { HygraphService, SlideData } from '../../services/hygraph.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, ServicesSectionComponent, ServiceModalComponent, TestimonialsSectionComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit, OnDestroy {
  private hygraph = inject(HygraphService);

  slides: SlideData[] = [];
  clients: { name: string, logo: { url: string } }[] = [];
  currentIndex = 0;
  private intervalId: any;

  ngOnInit() {
    this.hygraph.getSlides().subscribe({
      next: (data) => {
        this.slides = data;
        this.startTimer();
      },
      error: (err) => console.error('Error fetching slides in portfolio:', err)
    });

    this.hygraph.getClients().subscribe({
      next: (data) => this.clients = data,
      error: (err) => console.error('Error fetching clients:', err)
    });
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.resetTimer();
  }

  private startTimer() {
    if (typeof window !== 'undefined' && this.slides.length > 0) {
      this.intervalId = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      }, 6000);
    }
  }

  private stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private resetTimer() {
    this.stopTimer();
    this.startTimer();
  }
}


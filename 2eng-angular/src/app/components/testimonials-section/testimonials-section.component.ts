import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HygraphService, TestimonialData } from '../../services/hygraph.service';

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials-section.component.html',
  styleUrl: './testimonials-section.component.scss'
})
export class TestimonialsSectionComponent implements OnInit {
  private hygraph = inject(HygraphService);

  testimonials: TestimonialData[] = [];
  isLoading = true;

  ngOnInit() {
    this.hygraph.getTestimonials().subscribe({
      next: (data) => {
        this.testimonials = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching testimonials:', err);
        this.isLoading = false;
      }
    });
  }

  getArray(rating: number = 5): number[] {
    return Array(rating).fill(0);
  }
}

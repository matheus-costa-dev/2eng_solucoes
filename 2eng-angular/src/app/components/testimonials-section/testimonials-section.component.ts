import { Component, OnInit, OnDestroy, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HygraphService, TestimonialData } from '../../services/hygraph.service';

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials-section.component.html',
  styleUrl: './testimonials-section.component.scss'
})
export class TestimonialsSectionComponent implements OnInit, OnDestroy {
  private hygraph = inject(HygraphService);

  testimonials: TestimonialData[] = [];
  isLoading = true;

  currentIndex = 0;
  itemsPerPage = 3;
  private intervalId: any;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateItemsPerPage();
  }

  ngOnInit() {
    this.updateItemsPerPage();
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

  ngOnDestroy() {
    this.stopTimer();
  }

  updateItemsPerPage() {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) {
        this.itemsPerPage = 1;
      } else if (window.innerWidth < 1024) {
        this.itemsPerPage = 2;
      } else {
        this.itemsPerPage = 3;
      }
      // Ensure current index is valid after resize
      this.goToSlide(0);
    }
  }

  get visibleTestimonials() {
    if (!this.testimonials || this.testimonials.length === 0) return [];

    // For infinite loop effect, we copy items if we reach the end
    const result = [];
    for (let i = 0; i < this.itemsPerPage; i++) {
      const index = (this.currentIndex + i) % this.testimonials.length;
      result.push(this.testimonials[index]);
    }
    return result;
  }

  nextSlide() {
    if (this.testimonials.length <= this.itemsPerPage) return;
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
    this.resetTimer();
  }

  prevSlide() {
    if (this.testimonials.length <= this.itemsPerPage) return;
    this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
    this.resetTimer();
  }

  goToSlide(index: number) {
    if (index < 0 || index >= this.testimonials.length) return;
    this.currentIndex = index;
    this.resetTimer();
  }

  get totalDots(): number[] {
    if (this.testimonials.length <= this.itemsPerPage) return [];
    return Array(this.testimonials.length).fill(0).map((x, i) => i);
  }

  getArray(rating: number = 5): number[] {
    return Array(rating).fill(0);
  }

  private startTimer() {
    if (typeof window !== 'undefined' && this.testimonials.length > this.itemsPerPage) {
      this.intervalId = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
      }, 5000);
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

  startAutoPlay() {
    this.startTimer();
  }

  stopAutoPlay() {
    this.stopTimer();
  }
}


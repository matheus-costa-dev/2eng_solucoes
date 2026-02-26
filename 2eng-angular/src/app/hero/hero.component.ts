import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HygraphService, SlideData } from '../services/hygraph.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit, OnDestroy {
  private hygraph = inject(HygraphService);

  slides: SlideData[] = [];
  currentIndex = 0;
  private intervalId: any;

  ngOnInit() {
    this.hygraph.getSlides().subscribe({
      next: (data) => {
        this.slides = data;
        console.log('Slides Data from Hygraph:', data); // Verification log
        this.startTimer();
      },
      error: (err) => console.error('Error fetching slides:', err)
    });
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  nextSlide() {
    if (this.slides.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.resetTimer();
  }

  prevSlide() {
    if (this.slides.length === 0) return;
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.resetTimer();
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.resetTimer();
  }

  private startTimer() {
    if (typeof window !== 'undefined') {
      this.intervalId = setInterval(() => this.nextSlide(), 6000);
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


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
  isTransitioning = false;

  // Create a localized array that includes the cloned first and last slide
  get slidesWithClones() {
    if (!this.service || !this.service.images || this.service.images.length === 0) return [];
    const images = this.service.images;
    if (images.length === 1) return images;

    return [images[images.length - 1], ...images, images[0]];
  }

  // To map visual dots
  get visualIndex() {
    if (!this.service || !this.service.images) return 0;

    let vi = this.currentImageIndex - 1;
    if (vi < 0) vi = this.service.images.length - 1;
    if (vi >= this.service.images.length) vi = 0;
    return vi;
  }

  nextImage() {
    if (this.isTransitioning || !this.service?.images || this.service.images.length <= 1) return;
    this.isTransitioning = true;
    this.currentImageIndex++;

    // Wait for the CSS transition (500ms) to finish before resetting the track silently
    if (this.currentImageIndex === this.service.images.length + 1) {
      setTimeout(() => {
        this.currentImageIndex = 1;
        this.isTransitioning = false;
      }, 500);
    } else {
      setTimeout(() => this.isTransitioning = false, 500);
    }
  }

  prevImage() {
    if (this.isTransitioning || !this.service?.images || this.service.images.length <= 1) return;
    this.isTransitioning = true;
    this.currentImageIndex--;

    if (this.currentImageIndex === 0) {
      setTimeout(() => {
        if (this.service?.images) {
          this.currentImageIndex = this.service.images.length;
        }
        this.isTransitioning = false;
      }, 500);
    } else {
      setTimeout(() => this.isTransitioning = false, 500);
    }
  }

  goToSlide(index: number) {
    if (this.isTransitioning) return;
    this.currentImageIndex = index + 1;
  }
}

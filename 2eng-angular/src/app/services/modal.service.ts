import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ServiceData } from './hygraph.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private activeServiceSource = new BehaviorSubject<ServiceData | null>(null);
  activeService$ = this.activeServiceSource.asObservable();

  private isVisibleSource = new BehaviorSubject<boolean>(false);
  isVisible$ = this.isVisibleSource.asObservable();

  openModal(service: ServiceData) {
    this.activeServiceSource.next(service);
    this.isVisibleSource.next(true);

    // Disable body scroll when modal opens
    if (typeof window !== 'undefined') {
        document.body.style.overflow = 'hidden';
    }
  }

  closeModal() {
    this.activeServiceSource.next(null);
    this.isVisibleSource.next(false);

    // Re-enable body scroll when modal closes
    if (typeof window !== 'undefined') {
        document.body.style.overflow = '';
    }
  }
}

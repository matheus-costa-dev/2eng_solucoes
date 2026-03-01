import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceData } from '../../services/hygraph.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  @Input() services: ServiceData[] = [];
}

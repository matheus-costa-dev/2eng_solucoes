import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../hero/hero.component';
import { AboutComponent } from '../../components/about/about.component';
import { HygraphService, SlideData, ServiceData } from '../../services/hygraph.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroComponent, AboutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private hygraphService = inject(HygraphService);

  slides: SlideData[] = [];
  services: ServiceData[] = [];

  ngOnInit() {
    this.hygraphService.getSlides().subscribe((dados) => {
      this.slides = dados;
    });

    this.hygraphService.getServices().subscribe((dados) => {
      this.services = dados;
    });
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../hero/hero.component';
import { AboutComponent } from '../../components/about/about.component';
import { SolutionsComponent } from '../../components/solutions/solutions.component';
import { HygraphService, SlideData, ServiceHomeData } from '../../services/hygraph.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroComponent, AboutComponent, SolutionsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private hygraphService = inject(HygraphService);

  slides: SlideData[] = [];
  serviceHomes: ServiceHomeData[] = [];

  ngOnInit() {
    this.hygraphService.getSlides().subscribe((dados) => {
      this.slides = dados;
    });

    this.hygraphService.getServiceHomes().subscribe((dados) => {
      this.serviceHomes = dados;
    });
  }
}

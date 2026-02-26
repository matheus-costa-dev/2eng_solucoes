import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  ngOnInit() {
    this.titleService.setTitle('Engenharia e Soluções Técnicas | Excelência');
    this.metaService.addTags([
      { name: 'description', content: 'Soluções completas em Engenharia Condominial, Laudos Técnicos, e Manutenção Predial de excelência.' },
      { name: 'keywords', content: 'Engenharia Condominial, Laudos Técnicos, Manutenção Predial, Engenharia, Reforma' },
      { property: 'og:title', content: 'Engenharia e Soluções Técnicas | Excelência' },
      { property: 'og:description', content: 'Soluções completas em Engenharia Condominial, Laudos Técnicos, e Manutenção Predial de excelência.' },
      { property: 'og:type', content: 'website' }
    ]);
  }
}

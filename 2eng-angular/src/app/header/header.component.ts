import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isDarkTheme = false;

  ngOnInit() {
    if (typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark') {
      this.isDarkTheme = true;
      document.documentElement.classList.add('dark');
    } else if (typeof window !== 'undefined') {
       // Check if HTML already has class dark to sync state if needed
       if (document.documentElement.classList.contains('dark')) {
         this.isDarkTheme = true;
       }
    }
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    const html = document.documentElement;

    if (this.isDarkTheme) {
      html.classList.add('dark');
      if (typeof window !== 'undefined') localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      if (typeof window !== 'undefined') localStorage.setItem('theme', 'light');
    }
  }
}


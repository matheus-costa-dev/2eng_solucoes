import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  // Garante que os links funcionem no GitHub Pages
  base: '/leandro/',
});

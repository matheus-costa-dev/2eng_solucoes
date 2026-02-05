import './style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// --- LÓGICA DE TEMA (DARK MODE) ---
function toggleTheme() {
    const html = document.documentElement;
    const icon = document.getElementById('theme-icon');

    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    }
}

// Verificar preferência salva
if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
    document.getElementById('theme-icon').classList.remove('fa-moon');
    document.getElementById('theme-icon').classList.add('fa-sun');
}

// --- CARROSSEL ---
let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    slideIndex = (n + slides.length) % slides.length;
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
}

function nextSlide() { showSlide(slideIndex + 1); }
function prevSlide() { showSlide(slideIndex - 1); }
function goToSlide(n) { showSlide(n); }
setInterval(nextSlide, 6000);

// --- FILTRO DE SERVIÇOS ---
// --- FILTRO DE SERVIÇOS COM LOADER ---
function filterServices(category) {
  const grid = document.getElementById('services-grid');
  const loader = document.getElementById('services-loader');
  const cards = document.querySelectorAll('.service-card');
  const buttons = document.querySelectorAll('.filter-btn');

  // 1. Atualiza o estado visual dos botões imediatamente
  buttons.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.filter === category);
  });

  // 2. Esconde o grid e mostra o loader
  grid.style.opacity = '0';
  grid.classList.add('hidden');
  loader.classList.remove('hidden');

  // 3. Simula um tempo de carregamento (ex: 800ms) para garantir o "feel" de 100% carregado
  setTimeout(() => {
    // Filtra os cards enquanto eles estão escondidos
    cards.forEach((card) => {
      if (card.dataset.category === category) {
        card.classList.remove('hidden');
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      } else {
        card.classList.add('hidden');
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
      }
    });

    // 4. Esconde o loader e mostra o grid filtrado
    loader.classList.add('hidden');
    grid.classList.remove('hidden');

    // Pequeno delay para o efeito de fade-in suave do grid
    setTimeout(() => {
      grid.style.transition = 'opacity 0.4s ease';
      grid.style.opacity = '1';
    }, 50);
  }, 500); // Tempo do spinner em milissegundos
}

document.addEventListener('DOMContentLoaded', () => {
    filterServices('engenharia');
});

// --- NAVBAR SCROLL ---
let lastScrollTop = 0;
const navbar = document.getElementById('main-navbar');

window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 50) {
        navbar.classList.add('hidden-nav');
    } else {
        navbar.classList.remove('hidden-nav');
    }
    lastScrollTop = scrollTop;
});


window.toggleTheme = toggleTheme;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.goToSlide = goToSlide;
window.filterServices = filterServices;
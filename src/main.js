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

// --- DADOS DOS SERVIÇOS (MOCK) ---
// Coleta todas as imagens da pasta public para uso dinâmico nos modais
const allPublicImages = import.meta.glob('../public/**/*.{jpg,jpeg,png,webp}', { eager: true });

function getImagesForService(serviceId) {
  const images = [];
  const basePath = '/2eng_solucoes/'; // Base URL conforme vite.config.js

  for (const path in allPublicImages) {
    // path ex: "../public/obras/imagem.jpg"
    // Verifica se a imagem está na pasta correspondente ao serviceId
    if (path.includes(`/public/${serviceId}/`)) {
      const fileName = path.split('/').pop();
      images.push(`${basePath}${serviceId}/${fileName}`);
    }
  }
  return images;
}

const servicesData = {
  "obras": {
    title: "Obras e Reformas",
    category: "Engenharia",
    description: "Execução completa de obras residenciais e comerciais, desde a fundação até o acabamento. Garantimos cumprimento de cronogramas e orçamentos.",
    benefits: [
      "Gestão completa de obra",
      "Profissionais qualificados",
      "Minimização de desperdícios",
      "Garantia técnica de execução"
    ]
  },
  "projetos": {
    title: "Projetos de Engenharia",
    category: "Engenharia",
    description: "Elaboração de projetos arquitetônicos, estruturais, elétricos e hidrossanitários. Soluções integradas para evitar incompatibilidades.",
    benefits: [
      "Projetos compatibilizados",
      "Regularização junto aos órgãos",
      "Otimização de custos",
      "Detalhamento executivo"
    ]
  },
  "implantacoes": {
    title: "Implantações",
    category: "Engenharia",
    description: "Gerenciamento e execução de novas instalações em condomínios e empresas, garantindo funcionalidade e adesão às normas.",
    benefits: [
      "Planejamento estratégico",
      "Supervisão técnica",
      "Testes e comissionamento",
      "Treinamento de equipe"
    ]
  },
  "dimensionamentos": {
    title: "Dimensionamentos",
    category: "Engenharia",
    description: "Cálculos precisos para estruturas, cargas elétricas e sistemas hidráulicos, visando segurança e ecoeficiência.",
    benefits: [
      "Segurança estrutural",
      "Eficiência energética",
      "Conformidade com NBRs",
      "Redução de custos operacionais"
    ]
  },
  "reforco_estrutural": {
    title: "Reforço Estrutural",
    category: "Engenharia",
    description: "Recuperação e reforço de estruturas de concreto armado e metálicas, devolvendo a capacidade de carga e segurança à edificação.",
    benefits: [
      "Diagnóstico preciso",
      "Técnicas avançadas (Fibra de Carbono, etc.)",
      "Laudo de estabilidade",
      "Aumento da vida útil"
    ]
  },
  "pericias": {
    title: "Perícias de Engenharia",
    category: "Diagnóstica",
    description: "Investigação técnica para identificar causas de patologias construtivas (rachaduras, infiltrações) em condomínios e imóveis.",
    benefits: [
      "Identificação da origem do problema",
      "Fundamentação técnica",
      "Auxílio em disputas judiciais",
      "Recomendações de reparo"
    ]
  },
  "laudos": {
    title: "Laudos Técnicos",
    category: "Diagnóstica",
    description: "Emissão de laudos de autovistoria predial, recebimento de obra e inspeção predial, com validade legal e ART.",
    benefits: [
      "Atendimento à legislação",
      "Segurança jurídica",
      "Priorização de manutenções",
      "Valorização do imóvel"
    ]
  },
  "suporte_assembleias": {
    title: "Suporte em Assembleias",
    category: "Diagnóstica",
    description: "Acompanhamento técnico em assembleias de condomínio para esclarecer dúvidas sobre obras, manutenções e laudos.",
    benefits: [
      "Comunicação clara e técnica",
      "Embasamento para decisões",
      "Mediação de conflitos técnicos",
      "Transparência na gestão"
    ]
  },
  "manutencoes": {
    title: "Manutenção Predial",
    category: "Manutenção",
    description: "Gestão e execução de planos de manutenção preventiva e corretiva para condomínios e empresas.",
    benefits: [
      "Redução de custos emergenciais",
      "Preservação do patrimônio",
      "Segurança dos usuários",
      "Cronograma organizado"
    ]
  },
  "fachadas": {
    title: "Recuperação de Fachadas",
    category: "Manutenção",
    description: "Limpeza, pintura, reposição de pastilhas e tratamento de fissuras em fachadas prediais.",
    benefits: [
      "Valorização estética",
      "Proteção contra intempéries",
      "Segurança (risco de desplacamento)",
      "Materiais de alta durabilidade"
    ]
  },
  "impermeabilizacoes": {
    title: "Impermeabilização",
    category: "Manutenção",
    description: "Sistemas de impermeabilização para lajes, piscinas, reservatórios e áreas molhadas, eliminando infiltrações.",
    benefits: [
      "Fim das infiltrações",
      "Proteção da estrutura",
      "Garantia estendida",
      "Diversas tecnologias (Manta, PU, etc.)"
    ]
  },
  "spda": {
    title: "SPDA (Para-raios)",
    category: "Manutenção",
    description: "Instalação, manutenção e laudos de sistemas de proteção contra descargas atmosféricas (SPDA).",
    benefits: [
      "Conformidade com NBR 5419",
      "Segurança contra raios",
      "Proteção de equipamentos",
      "Emissão de laudo técnico"
    ]
  },
  "espacos_confinados": {
    title: "Espaços Confinados (NR-33)",
    category: "Especiais",
    description: "Serviços em locais de difícil acesso ou espaços confinados (cisternas, caixas d'água), com equipe certificada.",
    benefits: [
      "Segurança total (NR-33)",
      "Equipamentos de resgate",
      "Monitoramento de gases",
      "Profissionais habilitados"
    ]
  },
  "terceirizacoes": {
    title: "Terceirização de Mão de Obra",
    category: "Especiais",
    description: "Fornecimento de equipe técnica (eletricistas, encanadores, pedreiros) para demandas fixas ou pontuais.",
    benefits: [
      "Redução de encargos trabalhistas",
      "Gestão simplificada",
      "Substituição imediata",
      "Equipe uniformizada e treinada"
    ]
  }
};

// --- MODAL & MODAL CAROUSEL LOGIC ---
let currentModalImages = [];
let currentModalSlideIndex = 0;

function openServiceModal(serviceId) {
  const service = servicesData[serviceId];
  if (!service) return;

  // Popular conteúdo
  document.getElementById('modal-category').textContent = service.category;
  document.getElementById('modal-title').textContent = service.title;
  document.getElementById('modal-description').textContent = service.description;

  // Popular benefícios
  const benefitsList = document.getElementById('modal-benefits');
  benefitsList.innerHTML = service.benefits.map(benefit =>
    `<li class="flex items-start gap-2"><i class="fas fa-check text-green-500 mt-1 text-xs"></i><span>${benefit}</span></li>`
  ).join('');

  // Configurar Carrossel
  // Busca imagens dinamicamente da pasta correspondente
  currentModalImages = getImagesForService(serviceId);

  // Fallback caso não encontre imagens (opcional)
  if (currentModalImages.length === 0) {
    console.warn(`Nenhuma imagem encontrada para o serviço: ${serviceId}. Verifique se a pasta public/${serviceId} existe e contém imagens.`);
  }

  currentModalSlideIndex = 0;
  renderModalCarousel();

  // Mostrar Modal
  const modal = document.getElementById('service-modal');
  const backdrop = document.getElementById('modal-backdrop');
  const panel = document.getElementById('modal-panel');

  modal.classList.remove('hidden');
  // Pequeno delay para permitir a transição CSS
  setTimeout(() => {
    backdrop.classList.remove('opacity-0');
    panel.classList.remove('opacity-0', 'scale-95');
    panel.classList.add('opacity-100', 'scale-100');
  }, 10);

  document.body.style.overflow = 'hidden'; // Travar scroll do body
}

function closeServiceModal() {
  const modal = document.getElementById('service-modal');
  const backdrop = document.getElementById('modal-backdrop');
  const panel = document.getElementById('modal-panel');

  backdrop.classList.add('opacity-0');
  panel.classList.remove('opacity-100', 'scale-100');
  panel.classList.add('opacity-0', 'scale-95');

  setTimeout(() => {
    modal.classList.add('hidden');
    document.body.style.overflow = ''; // Destravar scroll
  }, 300); // Tempo da transição
}

// --- LOGICA DO CARROSSEL MODAL COM LOOP INFINITO ---
let isModalTransitioning = false;

function renderModalCarousel() {
  const track = document.getElementById('modal-carousel-track');
  const dotsContainer = document.getElementById('modal-carousel-dots');

  // Limpar
  track.innerHTML = '';
  dotsContainer.innerHTML = '';

  if (currentModalImages.length === 0) return;

  // Clonar último e primeiro slide para efeito de loop infinito
  const slidesWithClones = [
    currentModalImages[currentModalImages.length - 1], // Clone do último
    ...currentModalImages,
    currentModalImages[0] // Clone do primeiro
  ];

  // Criar Slides (incluindo clones)
  slidesWithClones.forEach((imgSrc) => {
    const slide = document.createElement('div');
    slide.className = 'min-w-full h-full bg-cover bg-center shrink-0'; // Adicionado shrink-0
    slide.style.backgroundImage = `url('${imgSrc}')`;
    track.appendChild(slide);
  });

  // Criar Dots (apenas para imagens reais)
  currentModalImages.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = `w-2 h-2 rounded-full transition-all ${index === 0 ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'}`;
    dot.onclick = () => goToModalSlide(index);
    dotsContainer.appendChild(dot);
  });

  // Resetar estado
  isModalTransitioning = false;
  // Começar no índice 1 (primeiro slide real) pois o índice 0 é o clone do último
  currentModalSlideIndex = 1;

  // Posicionar sem animação inicial
  track.style.transition = 'none';
  track.style.transform = `translateX(-${currentModalSlideIndex * 100}%)`;

  // Forçar reflow
  track.offsetHeight;

  // Reabilitar transição
  track.style.transition = 'transform 0.5s ease-out';

  updateModalDots();
}

function updateModalCarouselPosition() {
  const track = document.getElementById('modal-carousel-track');
  track.style.transform = `translateX(-${currentModalSlideIndex * 100}%)`;
}

function updateModalDots() {
  const dots = document.getElementById('modal-carousel-dots').children;
  if (!dots.length) return;

  // O índice visual real é currentModalSlideIndex - 1
  // Se estiver no clone final (índice N+1), visualmente é o slide 0
  // Se estiver no clone inicial (índice 0), visualmente é o slide N-1
  let visualIndex = currentModalSlideIndex - 1;

  if (visualIndex < 0) visualIndex = currentModalImages.length - 1;
  if (visualIndex >= currentModalImages.length) visualIndex = 0;

  Array.from(dots).forEach((dot, index) => {
    if (index === visualIndex) {
      dot.className = 'w-6 h-2 rounded-full transition-all bg-white';
    } else {
      dot.className = 'w-2 h-2 rounded-full transition-all bg-white/50 hover:bg-white/80';
    }
  });
}

function nextModalSlide() {
  if (isModalTransitioning || currentModalImages.length <= 1) return;

  const track = document.getElementById('modal-carousel-track');
  isModalTransitioning = true;
  currentModalSlideIndex++;

  track.style.transition = 'transform 0.5s ease-out';
  updateModalCarouselPosition();
  updateModalDots();

  // Se chegou no clone do primeiro (último item do array de slides)
  if (currentModalSlideIndex === currentModalImages.length + 1) {
    setTimeout(() => {
      track.style.transition = 'none';
      currentModalSlideIndex = 1; // Pular para o primeiro slide real
      updateModalCarouselPosition();
      isModalTransitioning = false;
    }, 500); // Esperar o tempo da transição
  } else {
    setTimeout(() => isModalTransitioning = false, 500);
  }
}

function prevModalSlide() {
  if (isModalTransitioning || currentModalImages.length <= 1) return;

  const track = document.getElementById('modal-carousel-track');
  isModalTransitioning = true;
  currentModalSlideIndex--;

  track.style.transition = 'transform 0.5s ease-out';
  updateModalCarouselPosition();
  updateModalDots();

  // Se chegou no clone do último (primeiro item do array de slides)
  if (currentModalSlideIndex === 0) {
    setTimeout(() => {
      track.style.transition = 'none';
      currentModalSlideIndex = currentModalImages.length; // Pular para o último slide real
      updateModalCarouselPosition();
      isModalTransitioning = false;
    }, 500);
  } else {
    setTimeout(() => isModalTransitioning = false, 500);
  }
}

function goToModalSlide(index) {
  if (isModalTransitioning) return;
  currentModalSlideIndex = index + 1; // +1 por causa do clone inicial
  const track = document.getElementById('modal-carousel-track');
  track.style.transition = 'transform 0.5s ease-out';
  updateModalCarouselPosition();
  updateModalDots();
}

// Inicializar Event Listeners dos Cards
document.addEventListener('DOMContentLoaded', () => {
  filterServices('engenharia');

  // Adicionar click nos cards
  const cards = document.querySelectorAll('.service-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const serviceId = card.getAttribute('data-service-id');
      if (serviceId) {
        openServiceModal(serviceId);
      }
    });
  });
});

// Inicializar Event Listeners dos Cards
document.addEventListener('DOMContentLoaded', () => {
  filterServices('engenharia');

  // Adicionar click nos cards
  const cards = document.querySelectorAll('.service-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const serviceId = card.getAttribute('data-service-id');
      if (serviceId) {
        openServiceModal(serviceId);
      }
    });
  });
});


window.toggleTheme = toggleTheme;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.goToSlide = goToSlide;
window.filterServices = filterServices;
// Exportar funções do modal para o window (caso precise usar no onclick do HTML, embora tenhamos adicionado listeners)
window.closeServiceModal = closeServiceModal;
window.nextModalSlide = nextModalSlide;
window.prevModalSlide = prevModalSlide;
window.goToModalSlide = goToModalSlide;
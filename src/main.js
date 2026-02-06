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
    ],
    images: [
      "/2eng_solucoes/restauracao-01.jpeg",
      "/2eng_solucoes/pintura-01.jpeg",
      "/2eng_solucoes/funcionario-epi.jpeg"
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
    ],
    images: [
      "/2eng_solucoes/termografia-01.jpeg",
      "/2eng_solucoes/pericia-01.jpeg"
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
    ],
    images: [
      "/2eng_solucoes/spda-06.jpeg",
      "/2eng_solucoes/funcionario-epi.jpeg"
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
    ],
    images: [
      "/2eng_solucoes/pericia-eletrica-01.jpeg",
      "/2eng_solucoes/pericia-eletrica-02.jpeg"
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
    ],
    images: [
      "/2eng_solucoes/pericia-01.jpeg",
      "/2eng_solucoes/pericia-02.jpeg"
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
    ],
    images: [
      "/2eng_solucoes/pericia-01.jpeg",
      "/2eng_solucoes/pericia-eletrica-01.jpeg",
      "/2eng_solucoes/pericia-eletrica-03.jpeg"
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
    ],
    images: [
      "/2eng_solucoes/termografia-01.jpeg",
      "/2eng_solucoes/termografia-02.jpeg",
      "/2eng_solucoes/termografia-03.jpeg",
      "/2eng_solucoes/termografia-04.jpeg"
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
    ],
    images: [
      "/2eng_solucoes/funcionario-epi.jpeg",
      "/2eng_solucoes/carrousel/img1.png"
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
    ],
    images: [
      "/2eng_solucoes/fachada-depois-01.jpeg",
      "/2eng_solucoes/fachada-restaurada-01.jpeg",
      "/2eng_solucoes/pintura-01.jpeg"
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
    ],
    images: [
      "/2eng_solucoes/fachada-restaurada-01.jpeg",
      "/2eng_solucoes/fachada-restaurada-02.jpeg",
      "/2eng_solucoes/fachada-restaurada-03.jpeg",
      "/2eng_solucoes/fachada-restaurada-04.jpeg",
      "/2eng_solucoes/fachada-restaurada-05.jpeg",
      "/2eng_solucoes/fachada-restaurada-06.jpeg",
      "/2eng_solucoes/fachada-depois-01.jpeg",
      "/2eng_solucoes/fachada-depois-02.jpeg",
      "/2eng_solucoes/fachada-depois-03.jpeg",
      "/2eng_solucoes/fachada-antes-01.jpeg",
      "/2eng_solucoes/fachada-antes-02.jpeg",
      "/2eng_solucoes/fachada-antes-03.jpeg"
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
    ],
    images: [
      "/2eng_solucoes/pintura-02.jpeg",
      "/2eng_solucoes/fachada-depois-01.jpeg"
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
    ],
    images: [
      "/2eng_solucoes/spda-17.jpeg",
      "/2eng_solucoes/spda-18.jpeg",
      "/2eng_solucoes/spda-19.jpeg",
      "/2eng_solucoes/spda-20.jpeg",
      "/2eng_solucoes/spda-01.jpeg",
      "/2eng_solucoes/spda-02.jpeg",
      "/2eng_solucoes/spda-03.jpeg",
      "/2eng_solucoes/spda-04.jpeg",
      "/2eng_solucoes/spda-05.jpeg",
      "/2eng_solucoes/spda-06.jpeg",
      "/2eng_solucoes/spda-07.jpeg",
      "/2eng_solucoes/spda-08.jpeg",
      "/2eng_solucoes/spda-09.jpeg",
      "/2eng_solucoes/spda-10.jpeg",
      "/2eng_solucoes/spda-11.jpeg",
      "/2eng_solucoes/spda-12.jpeg",
      "/2eng_solucoes/spda-13.jpeg",
      "/2eng_solucoes/spda-14.jpeg",
      "/2eng_solucoes/spda-15.jpeg",
      "/2eng_solucoes/spda-16.jpeg"
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
    ],
    images: [
      "/2eng_solucoes/confinado-01.jpeg",
      "/2eng_solucoes/confinado-02.jpeg",
      "/2eng_solucoes/confinado-03.jpeg",
      "/2eng_solucoes/confinado-04.jpeg"
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
    ],
    images: [
      "/2eng_solucoes/funcionario-epi.jpeg",
      "/2eng_solucoes/carrousel/img1.png"
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
  currentModalImages = service.images;
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
  if (isModalTransitioning) return;

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
  if (isModalTransitioning) return;

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
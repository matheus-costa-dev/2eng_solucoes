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

// --- CARROSSEL PRINCIPAL DINAMICO ---
// Importante: Usamos as: 'url' (ou query: '?url') para que o Vite retorne apenas o caminho do arquivo
// e não tente processá-lo como módulo JS, evitando o erro "Assets in public directory cannot be imported".
const mainCarouselImages = import.meta.glob(['../src/assets/carrousel/*.{jpg,jpeg,png,webp}'], { eager: true, query: '?url', import: 'default' });
const mainCarouselTrack = document.getElementById('main-carousel-track');
const dotsContainer = document.querySelector('.absolute.bottom-12.left-1\\/2');

// Configuração de Textos para o Carrossel
const carouselData = {
  'img1.png': {
    title: 'Engenharia de Alta Performance',
    text: 'Soluções completas em obras, projetos e manutenções prediais com rigor técnico e segurança.',
    link: '#servicos',
    btnText: 'Conheça nossos serviços'
  },
  'img2.png': {
    title: 'Segurança e Diagnóstico',
    text: 'Perícias, laudos e suporte técnico especializado para garantir a valorização do seu patrimônio.',
    link: '#contato',
    btnText: 'Solicitar Orçamento'
  },
  'funcionario-epi.jpeg': {
    title: 'Equipe Qualificada',
    text: 'Profissionais treinados e equipados com rigorosos padrões de segurança para sua obra.',
    link: '#sobre',
    btnText: 'Conheça a Equipe'
  },
  'restauracao-01.jpeg': {
    title: 'Restauração Especializada',
    text: 'Técnicas avançadas de recuperação estrutural e estética para renovar seu patrimônio.',
    link: '#servicos',
    btnText: 'Ver Serviços'
  },
  'pintura-01.jpeg': {
    title: 'Acabamento Superior',
    text: 'Pintura e revitalização de fachadas com materiais de alta durabilidade e garantia.',
    link: '#contato',
    btnText: 'Fale Conosco'
  },
  'pericia-eletrica-01.jpeg': {
    title: 'Perícia e Diagnóstico Elétrico',
    text: 'Análise detalhada de instalações elétricas para garantir segurança e conformidade.',
    link: '#servicos',
    btnText: 'Saiba Mais'
  }
};

let slideIndex = 0;
let slides = [];
let dots = [];
let slideInterval;

function initMainCarousel() {
  if (!mainCarouselTrack) return;

  mainCarouselTrack.innerHTML = '';

  const dotsWrapper = document.querySelector('.absolute.bottom-12.left-1\\/2.z-30.flex.gap-3');
  if (dotsWrapper) dotsWrapper.innerHTML = '';

  const images = [];
  for (const path in mainCarouselImages) {
    const filename = path.split('/').pop();
    const imgSrc = mainCarouselImages[path];
    images.push({ filename, imgSrc });
  }

  images.forEach((img, index) => {
    const config = carouselData[img.filename] || {
      title: 'Soluções em Engenharia',
      text: 'Qualidade e compromisso com o resultado.',
      link: '#contato',
      btnText: 'Fale Conosco'
    };

    const slide = document.createElement('div');
    // Mantive o flex e h-full para garantir o alinhamento central do conteúdo
    slide.className = `carousel-item absolute inset-0 flex items-center justify-center text-center px-4 overflow-hidden ${index === 0 ? 'active' : ''}`;

    slide.innerHTML = `
      <div class="absolute inset-0 bg-cover bg-center blur-md scale-110 opacity-40" 
           style="background-image: url('${img.imgSrc}');"></div>
      
      <div class="absolute inset-0 bg-brand-dark/60"></div>

      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat mix-blend-normal" 
           style="background-image: url('${img.imgSrc}');"></div>
      
      <div class="relative z-10 max-w-4xl mx-auto pt-20">
        <h1 class="text-4xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">${config.title}</h1>
        <p class="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto drop-shadow-md">${config.text}</p>
        <a href="${config.link}" class="inline-block bg-brand-primary hover:bg-blue-900 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-xl border border-white/10">
          ${config.btnText}
        </a>
      </div>
    `;
    mainCarouselTrack.appendChild(slide);

    if (dotsWrapper) {
      const dot = document.createElement('div');
      dot.className = `dot h-2 w-8 rounded-full bg-white/30 transition-all cursor-pointer ${index === 0 ? 'active' : ''}`;
      dot.onclick = () => goToSlide(index);
      dotsWrapper.appendChild(dot);
    }
  });

  slides = document.querySelectorAll('.carousel-item');
  dots = document.querySelectorAll('.dot');
  startCarouselTimer();
}

function showSlide(n) {
  if (!slides.length) return;

  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));

  slideIndex = (n + slides.length) % slides.length;

  if (slides[slideIndex]) slides[slideIndex].classList.add('active');
  if (dots[slideIndex]) dots[slideIndex].classList.add('active');
}

function nextSlide() { showSlide(slideIndex + 1); }
function prevSlide() { showSlide(slideIndex - 1); }
function goToSlide(n) { showSlide(n); restartTimer(); }

function startCarouselTimer() {
  if (slideInterval) clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 6000);
}

function restartTimer() {
  startCarouselTimer();
}

// Inicializar assim que o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initMainCarousel);

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
const allPublicImages = import.meta.glob('../src/assets/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default'
});

function getImagesForService(serviceId) {
  const images = [];

  for (const path in allPublicImages) {
    // O Vite transforma "../src/assets/obras/foto.jpg" em algo como "/assets/foto.hash.jpg"
    // Verificamos se o caminho original contém a pasta do serviço
    if (path.includes(`/${serviceId}/`)) {
      // O valor em allPublicImages[path] já é a URL final processada pelo Vite
      images.push(allPublicImages[path]);
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
import { Component, Input, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceData } from '../../services/hygraph.service';
import { ModalService } from '../../services/modal.service';
import { SERVICE_IMAGES } from '../../data/service-images';

const SERVICES_DATA: Record<string, any> = {
  "obras": {
    "title": "Obras e Reformas",
    "category": "Engenharia",
    "description": "Execução completa de obras residenciais e comerciais, desde a fundação até o acabamento. Garantimos cumprimento de cronogramas e orçamentos.",
    "benefits": [
      "Gestão completa de obra",
      "Profissionais qualificados",
      "Minimização de desperdícios",
      "Garantia técnica de execução"
    ]
  },
  "projetos": {
    "title": "Projetos de Engenharia",
    "category": "Engenharia",
    "description": "Elaboração de projetos arquitetônicos, estruturais, elétricos e hidrossanitários. Soluções integradas para evitar incompatibilidades.",
    "benefits": [
      "Projetos compatibilizados",
      "Regularização junto aos órgãos",
      "Otimização de custos",
      "Detalhamento executivo"
    ]
  },
  "implantacoes": {
    "title": "Implantações",
    "category": "Engenharia",
    "description": "Gerenciamento e execução de novas instalações em condomínios e empresas, garantindo funcionalidade e adesão às normas.",
    "benefits": [
      "Planejamento estratégico",
      "Supervisão técnica",
      "Testes e comissionamento",
      "Treinamento de equipe"
    ]
  },
  "dimensionamentos": {
    "title": "Dimensionamentos",
    "category": "Engenharia",
    "description": "Cálculos precisos para estruturas, cargas elétricas e sistemas hidráulicos, visando segurança e ecoeficiência.",
    "benefits": [
      "Segurança estrutural",
      "Eficiência energética",
      "Conformidade com NBRs",
      "Redução de custos operacionais"
    ]
  },
  "reforco_estrutural": {
    "title": "Reforço Estrutural",
    "category": "Engenharia",
    "description": "Recuperação e reforço de estruturas de concreto armado e metálicas, devolvendo a capacidade de carga e segurança à edificação.",
    "benefits": [
      "Diagnóstico preciso",
      "Técnicas avançadas (Fibra de Carbono, etc.)",
      "Laudo de estabilidade",
      "Aumento da vida útil"
    ]
  },
  "pericias": {
    "title": "Perícias de Engenharia",
    "category": "Diagnóstica",
    "description": "Investigação técnica para identificar causas de patologias construtivas (rachaduras, infiltrações) em condomínios e imóveis.",
    "benefits": [
      "Identificação da origem do problema",
      "Fundamentação técnica",
      "Auxílio em disputas judiciais",
      "Recomendações de reparo"
    ]
  },
  "laudos": {
    "title": "Laudos Técnicos",
    "category": "Diagnóstica",
    "description": "Emissão de laudos de autovistoria predial, recebimento de obra e inspeção predial, com validade legal e ART.",
    "benefits": [
      "Atendimento à legislação",
      "Segurança jurídica",
      "Priorização de manutenções",
      "Valorização do imóvel"
    ]
  },
  "suporte_assembleias": {
    "title": "Suporte em Assembleias",
    "category": "Diagnóstica",
    "description": "Acompanhamento técnico em assembleias de condomínio para esclarecer dúvidas sobre obras, manutenções e laudos.",
    "benefits": [
      "Comunicação clara e técnica",
      "Embasamento para decisões",
      "Mediação de conflitos técnicos",
      "Transparência na gestão"
    ]
  },
  "manutencoes": {
    "title": "Manutenção Predial",
    "category": "Manutenção",
    "description": "Gestão e execução de planos de manutenção preventiva e corretiva para condomínios e empresas.",
    "benefits": [
      "Redução de custos emergenciais",
      "Preservação do patrimônio",
      "Segurança dos usuários",
      "Cronograma organizado"
    ]
  },
  "fachadas": {
    "title": "Recuperação de Fachadas",
    "category": "Manutenção",
    "description": "Limpeza, pintura, reposição de pastilhas e tratamento de fissuras em fachadas prediais.",
    "benefits": [
      "Valorização estética",
      "Proteção contra intempéries",
      "Segurança (risco de desplacamento)",
      "Materiais de alta durabilidade"
    ]
  },
  "impermeabilizacoes": {
    "title": "Impermeabilização",
    "category": "Manutenção",
    "description": "Sistemas de impermeabilização para lajes, piscinas, reservatórios e áreas molhadas, eliminando infiltrações.",
    "benefits": [
      "Fim das infiltrações",
      "Proteção da estrutura",
      "Garantia estendida",
      "Diversas tecnologias (Manta, PU, etc.)"
    ]
  },
  "spda": {
    "title": "SPDA (Para-raios)",
    "category": "Manutenção",
    "description": "Instalação, manutenção e laudos de sistemas de proteção contra descargas atmosféricas (SPDA).",
    "benefits": [
      "Conformidade com NBR 5419",
      "Segurança contra raios",
      "Proteção de equipamentos",
      "Emissão de laudo técnico"
    ]
  },
  "espacos_confinados": {
    "title": "Espaços Confinados (NR-33)",
    "category": "Especiais",
    "description": "Serviços em locais de difícil acesso ou espaços confinados (cisternas, caixas d'água), com equipe certificada.",
    "benefits": [
      "Segurança total (NR-33)",
      "Equipamentos de resgate",
      "Monitoramento de gases",
      "Profissionais habilitados"
    ]
  },
  "terceirizacoes": {
    "title": "Terceirização de Mão de Obra",
    "category": "Especiais",
    "description": "Fornecimento de equipe técnica (eletricistas, encanadores, pedreiros) para demandas fixas ou pontuais.",
    "benefits": [
      "Redução de encargos trabalhistas",
      "Gestão simplificada",
      "Substituição imediata",
      "Equipe uniformizada e treinada"
    ]
  }
};

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solutions.component.html',
  styleUrl: './solutions.component.scss'
})
export class SolutionsComponent implements OnInit {
  @Input() services: ServiceData[] = [];
  private modalService = inject(ModalService);

  selectedCategory: string = 'engenharia';
  isLoading: boolean = false;
  isFadingIn: boolean = true;

  ngOnInit() {
    this.isFadingIn = true;
  }

  filterServices(category: string) {
    if (this.selectedCategory === category) return;

    this.isLoading = true;
    this.isFadingIn = false;

    setTimeout(() => {
      this.selectedCategory = category;
      this.isLoading = false;

      setTimeout(() => {
        this.isFadingIn = true;
      }, 50);
    }, 500);
  }

  openServiceModal(serviceId: string) {
    const data = SERVICES_DATA[serviceId];
    if (data) {
      // Find matching dynamic data from Hygraph if exists to get real images
      const matched = this.services.find(s => s.title.toLowerCase().includes(data.title.toLowerCase()));

      // Prioritize matched images from Hygraph, but fallback to auto-generated local images
      const serviceImages = (matched?.images?.length) ? matched.images : (SERVICE_IMAGES[serviceId] || []);

      const payload: ServiceData = {
        title: data.title,
        category: data.category,
        description: data.description,
        benefits: data.benefits,
        images: serviceImages
      };

      this.modalService.openModal(payload);
    }
  }
}

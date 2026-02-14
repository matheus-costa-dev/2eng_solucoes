# 2ENG - Engenharia e Soluções Técnicas

Este projeto é uma **Single Page Application (SPA)** de alta performance, construída para oferecer uma interface moderna com foco em engenharia predial. A arquitetura prioriza a separação entre dados (JSON/Objetos) e a camada de visualização (DOM).

## 📂 Estrutura de Pastas

```text
C:.
├── .github/workflows       # Automação de CI/CD (GitHub Actions)
├── executaveis/            # Scripts .bat para automação do cliente
├── public/                 # Recursos estáticos (Fonts e Favicon)
├── src/
│   ├── assets/             # Banco de imagens organizado por categoria
│   │   ├── carrousel/      # Fotos do banner principal
│   │   ├── diagnostica/    # Laudos e perícias
│   │   ├── engenharia/     # Obras e projetos
│   │   ├── especiais/      # Espaços confinados
│   │   └── manutencao/     # Fachadas e impermeabilização
│   ├── main.js             # Lógica central, Carrosséis e Modais
│   └── style.css           # Tailwind v4, Variáveis de Tema e Glassmorphism
├── index.html              # Estrutura base e pontos de montagem
├── package.json            # Scripts npm e dependências
└── .gitignore              # Filtro de arquivos para o Git
```

## 🛠️ Stack Tecnológica e Funcionalidades

### 1. Motor de Estilização: Tailwind CSS v4
O projeto utiliza a versão mais recente do Tailwind, aproveitando o processamento via **Vite** para máxima velocidade.
* **Variáveis de Tema:** Centralizadas no `@theme` dentro do `style.css` para garantir que cores de marca (`--color-brand-primary`, etc.) sejam aplicadas consistentemente.
* **Glassmorphism Nativo:** Uso de filtros de desfoque (`backdrop-blur-md`) e bordas semitransparentes em modais e na barra de navegação.
* **Dark Mode:** Implementado via classe `.dark` no elemento raiz (`html`), permitindo a troca dinâmica de estilos para todos os componentes.

### 2. Lógica de Dados Dinâmicos (`main.js`)
Diferente de sites estáticos comuns, este projeto gerencia o conteúdo de forma dinâmica:
* **Mock Data Layer:** O objeto `servicesData` centraliza os títulos, textos e listas de itens de todos os 14 serviços. Isso permite atualizar o texto do site sem precisar caçar tags no HTML.
* **Injeção Dinâmica em Modais:** Ao clicar em um card, o script captura o `data-service-id` e preenche o modal em tempo real:
    ```javascript
    function openServiceModal(serviceId) {
      const service = servicesData[serviceId];
      // Preenche título, descrição e ícones dinamicamente
    }
    ```

### 3. Filtragem de Serviços
O sistema de categorias utiliza manipulação de classes CSS para uma experiência fluida:
* **Mecânica:** O sistema filtra os cards pela classe de categoria (ex: `.engenharia`, `.diagnostica`).
* **Transição:** Cards não selecionados recebem a classe `.hidden`, enquanto os ativos são exibidos com animações de opacidade.

### 4. Gestão de Assets com Vite (`glob import`)
Para o carrossel de fotos, utilizamos o poder do Vite para ler pastas inteiras automaticamente:
* **Funcionalidade:** O código varre a pasta `src/assets/carrousel/` e gera os slides sem que o desenvolvedor precise registrar cada imagem manualmente no HTML.
* **Infinite Loop:** Implementação de carrossel infinito com clones de slides para garantir que a transição visual nunca pare.

---

## 🏗️ Estrutura do HTML

O `index.html` foi estruturado para ser semântico e focado em acessibilidade:
* **Navbar Inteligente:** Possui lógica para esconder ao rolar a página (scroll down) e reaparecer ao subir (scroll up), maximizando a área de leitura.
* **Grid de Serviços:** Utiliza CSS Grid responsivo que se adapta de 1 a 3 colunas dependendo da tela.
* **Formulário:** Integrado via `POST` diretamente para o **Formspree**, eliminando a necessidade de um servidor de e-mail próprio.

---

## 💻 Comandos de Desenvolvimento

O projeto inclui scripts automatizados para facilitar o fluxo de trabalho:

| Comando | Função |
| :--- | :--- |
| `npm run dev` | Inicia o ambiente de desenvolvimento com Hot Module Replacement (HMR). |
| `npm run build` | Compila e otimiza o código para produção na pasta `/dist`. |
| `npm run preview` | Simula a versão de produção localmente. |

## 📦 Automação para o Cliente
Na pasta `/executaveis`, os arquivos `.bat` permitem que:
1.  **Testar Localmente:** O cliente suba o servidor de teste com um clique.
2.  **Produção:** O cliente faça o `git add`, `commit` (com timestamp) e `push` (com token embutido) automaticamente para o GitHub.

---
**Desenvolvido por:** [Matheus Costa Dev](https://github.com/matheus-costa-dev)  
**Versão:** 1.0.0
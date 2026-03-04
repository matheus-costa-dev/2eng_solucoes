# Guia de Gestão de Conteúdo - Hygraph (2ENG Soluções)

Este documento explica como adicionar, editar e remover itens no painel do [Hygraph](https://app.hygraph.com/) para que eles apareçam corretamente nas páginas "Home" e "Portfólio" do seu site Angular.

---

## 1. Carrossel de Imagens (Hero Section)

As imagens grandes que ficam passando sozinhas no topo do site (tanto na página inicial quanto no portfólio) são controladas aqui.

- **Model no Hygraph:** `Slide`
- **Onde aparece:** Topo da página Home e Topo da página Portfólio.
- **Campos Necessários:**
  - **`title`** (Single line text): Um título interno para organização.
  - **`background`** (Asset image): A foto em si. Recomendado imagens na horizontal, em alta resolução.
- **Como Adicionar:** Vá em Content > "Slide" > "Create item". Faça o upload da imagem de fundo no campo "background" e dê um título no campo "title". 
- ⚠️ **Importante:** Sempre clique em **"Save and Publish"** após fazer o upload! Imagens salvas como "Rascunho" (Draft) não aparecem no site.

---

## 2. Nossos Serviços 

Os cartões que explicam o que a 2ENG Soluções faz, contendo um título, descrição, e ícone expansível (ao clicar em "Saiba mais", abre uma janela modal com a foto).

- **Model no Hygraph:** `Service`
- **Onde aparece:** Sessão de serviços ("O que oferecemos") na Home e Portfólio.
- **Campos Necessários:**
  - **`title`** (Single line text): Título do serviço (ex: "Construção Comercial").
  - **`description`** (Multi-line text): Texto curto que aparece no cartão.
  - **`icon`** (Single line text): Opcional. O nome do ícone (sem o `fa-` antes). Se não preencher, o sistema usa o padrão geométrico. Aqui está uma lista de ícones recomendados e o que você deve digitar:
    - **Construção/Engenharia Genérica:** `hard-hat` (Capacete), `building` (Prédio), `tools` (Ferramentas), `paint-roller` (Rolo de Pintar), `hammer` (Martelo), `ruler-combined` (Régua e Esquadro), `truck-pickup` (Caminhonete), `snowplow` (Trator/Escavadeira).
    - **Elétrica/Energia:** `bolt` (Raio), `plug` (Tomada), `lightbulb` (Lâmpada), `solar-panel` (Placa Solar).
    - **Hidráulica/Limpeza:** `faucet-drip` (Torneira), `bath` (Banheira), `water` (Água/Ondas), `broom` (Vassoura/Limpeza).
    - **Projetos/Gestão:** `pen-ruler` (Caneta e Régua), `compass` (Bússola), `drafting-compass` (Compasso de Desenho), `briefcase` (Maleta).
  - **`image`** (Asset image): A foto/imagem grande que aparecerá **dentro da janela Modal** quando o cliente clicar em "Saiba mais".
- **Como Adicionar:** Vá em Content > "Service" > "Create item". Preencha Título e Descrição, coloque o ícone (opcional) e suba a Foto representativa da obra. Sempre clique em **"Save and Publish"** no final.

---

## 3. Depoimentos de Clientes

O carrossel giratório ("O que nossos clientes dizem") que exibe a foto do cliente, o cargo, as estrelinhas de avaliação e o comentário de feedback deixado por ele.

- **Model no Hygraph:** `Testimonial`
- **Onde aparece:** Logo abaixo dos cartões de Serviço, na Home e no Portfólio.
- **Campos Necessários:**
  - **`name`** (Single line text): O nome do cliente ou representante da empresa.
  - **`role`** (Single line text): O cargo ou empresa (ex: "CEO - TechFix", "Proprietário Lote 14").
  - **`text`** (Multi-line text): A citação em texto. O depoimento ou feedback real dele.
  - **`rating`** (Integer / Número Inteiro): O número de estrelas a receber entre 1 a 5. Qualquer número preenchido fará as estrelinhas amarelas serem desenhadas no Portfólio.
  - **`avatar`** (Asset image): Opcional. A foto do rosto do cliente. Se deixado vazio, o site exibirá apenas as iniciais da pessoa em formato circular automaticamente.
- **Como Adicionar:** Vá em Content > "Testimonial" > "Create item". Preencha os campos de texto, coloque o número exato de estrelas no rating e anexe o avatar. E lembre-se, sempre **"Save and Publish"**.

---

## 4. Empresas Que Já Prestamos Serviços (Logos)

As logomarcas dispostas lado a lado na parte debaixo do site. Esses logotipos substituem as velhas empresas estáticas pelas que você colocar no painel.

- **Model no Hygraph:** `Client`
- **Onde aparece:** Somente na página de "Portfólio", logo acima da área de Depoimentos e Abaixo dos Textos.
- **Campos Necessários:**
  - **`name`** (Single line text): O nome da empresa (ex: "Petrobras", "Vale").
  - **`logo`** (Asset image): O arquivo PNG ou SVG sem fundo do logotipo da marca. Se o logotipo tiver fundo, ele será mostrado.
- **Como Adicionar:** Se você ainda não possui o Model "Client" (no singular, com "C" maiúsculo e ID "client"): Dê um pulo antes na aba "Schema" e crie-o. Senão, vá em Content > "Client" > "Create item". Preencha o nome da empresa e suba a foto de fato na sua área de `logo`. Clique em **"Save and Publish"**. Seu logotipo automaticamente se adaptará em altura ao lado de qualquer outro que for inserido sem bagunçar a fileira!

---

💡 **Dica de Ouro:**
Sempre confira no Hygraph se as bolinhas do lado direito de cada item (na listagem de conteúdos) estão 🟢 Verdes (publicados) ao invés de ⚪ Cinzas (rascunho). Use a opção inferior lateral do "API Access" (configuração Mestra de permissões) e garanta que aquele tipo novo Model possui o checkbox da ação "Read" ativado se ele não aparecer no código!

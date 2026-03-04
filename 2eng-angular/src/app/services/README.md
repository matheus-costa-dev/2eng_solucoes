# Documentação da pasta `services`

Esta pasta contém a lógica central de comunicação com APIs, gerenciamento de estado (como modais) e, atualmente, um componente visual (UI) associado aos "serviços" da empresa/projeto.

Abaixo está a explicação detalhada de cada arquivo que compõe esta pasta.

---

## 1. `hygraph.service.ts`
Este é um serviço Angular responsável por fazer a **comunicação com a API do Hygraph** (um CMS Headless baseado em GraphQL). O objetivo dele é buscar no banco de dados os conteúdos que aparecerão dinamicamente no site.

**O que ele faz detalhadamente:**
- **Interfaces (`SlideData` e `ServiceData`)**: Logo no começo do arquivo, ele define os "tipos" de dados que o site espera receber. Um slide, por exemplo, deve obrigatoriamente ter título, texto, link, texto do botão e imagem de fundo. Isso ajuda o TypeScript a avisar caso você use uma variável errada.
- **Injeção de Bibliotecas**: O serviço usa o `HttpClient` do Angular para fazer requisições na internet. Ele também busca a URL da API e o "Token de Segurança" dentro de um arquivo seguro (`environment`).
- **Método `getSlides()`**: Prepara uma requisição na linguagem GraphQL buscando informações do banner principal (Slides). Ele faz a chamada para o Hygraph e retorna a lista encontrada. Caso a internet caia ou a API dê erro, ele "pega" esse erro (`catchError`) para que o site não quebre e retorna uma lista vazia.
- **Método `getServices()`**: Funciona de forma parecida com os slides, mas traz os dados dos Serviços oferecidos (título, categoria, descrição, imagens).

---

## 2. `modal.service.ts`
Este é um serviço focado em **Gerenciamento de Estado**. Em vez de buscar coisas na internet, ele serve como um "mensageiro central" entre diferentes partes do seu site para controlar um Modal (uma janela pop-up na frente da tela).

**O que ele faz detalhadamente:**
- **Variáveis Reativas (`BehaviorSubject`)**: Este conceito do RxJS faz com que variáveis virem "transmissoras ao vivo". Quando o valor muda, a tela toda fica sabendo automaticamente.
  - O `activeService$` guarda qual serviço o usuário clicou para visualizar.
  - O `isVisible$` guarda se o modal está aberto (`true`) ou fechado (`false`).
- **Método `openModal(service)`**: É acionado quando você clica num botão do tipo "Ver detalhes". Ele avisa a aplicação que a visibilidade é verdadeira e qual serviço deve ser exibido. Além disso, **trava a barra de rolagem da página** (`overflow = 'hidden'`) para que o usuário role apenas dentro do modal, melhorando a experiência de navegação.
- **Método `closeModal()`**: Avisa a aplicação que o modal deve fechar e esvazia o serviço selecionado. Por fim, **destrava a barra de rolagem** novamente.

---

## 3. `services.component.ts`, `.html` e `.scss`
Normalmente, a pasta `services/` costuma guardar apenas as lógicas invisíveis (como os dois serviços acima). Porém, aqui existe também um **Componente Angular visual**, chamado `<app-services>`. Ele se destina a ser a parte visual da página que renderiza a lista de serviços.

**O que ele faz detalhadamente:**
- **`services.component.ts`**: É o cérebro visual desta parte. Atualmente é um Componente Standalone (Angular 17+) bem básico, pronto para você importar as funções que fizemos no `hygraph.service` e gerenciar uma lista para jogar na tela.
- **`services.component.html`**: É a estrutura visual (o HTML). No momento, só tem o código gerado automaticamente: `<p>services works!</p>`. É aqui que você, futuramente, fará um laço de repetição (`*ngFor`) para imprimir cards de serviço.
- **`services.component.scss`**: É a folha de estilos exclusiva para customizar a parte visual e o layout dos seus serviços, sem afetar o resto do site.

---

## 4. Arquivos terminados em `.spec.ts`
Você pode ter notado arquivos como `hygraph.service.spec.ts`, `modal.service.spec.ts` e `services.component.spec.ts`. 

- **Para que servem**: Qualquer arquivo que termine em `.spec.ts` (de specification) serve para escrever testes automatizados. 
- **Detalhes**: Eles garantem que, mesmo que você altere seu código no futuro, as funcionalidades básicas não vão quebrar. Por padrão, o Angular gera para cada componente e serviço criado, um teste mínimo que pelo menos garante que "O serviço foi injetado com sucesso". Os testes rodam quando você executa comandos como `ng test`. Eles não afetam o site quando ele vai para o ar para o seu usuário.

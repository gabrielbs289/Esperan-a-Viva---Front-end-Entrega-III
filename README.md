# Esperança Viva - Front-end (Entrega III)

**Autor:** FELIPE GABRIEL CIRINO DOS SANTOS
**Disciplina:** Desenvolvimento Front-end
**Entrega:** Experiência Prática III

## 🚀 Descrição

Este projeto é a terceira e última entrega (Entrega III) da disciplina de Desenvolvimento Front-end. O foco foi implementar JavaScript avançado para transformar o site estático em uma aplicação web dinâmica e interativa, simulando funcionalidades de uma aplicação real.

## ✅ Requisitos da Entrega III (Cumpridos)

Este projeto implementa todos os requisitos obrigatórios da Entrega III:

* **Manipulação do DOM / SPA:**
    * Implementado um sistema de **Single Page Application (SPA)** básico. A navegação entre as páginas (Início, Projetos, Cadastro) é feita dinamicamente com `fetch()` e `history.pushState()`, carregando apenas o conteúdo principal (`<main>`) sem dar refresh na página inteira.
* **Templates JavaScript:**
    * A página de "Projetos" agora é renderizada dinamicamente. Os cards de projetos são gerados via JavaScript a partir de um array de objetos, demonstrando o uso de *templates*.
* **Funcionalidades Específicas (Validação Avançada):**
    * O formulário de cadastro agora possui um sistema de **verificação de consistência de dados**.
    * Mensagens de erro específicas (ex: "Por favor, insira seu nome completo", "CPF deve ter 11 dígitos") são exibidas abaixo de cada campo inválido, e os campos são destacados em vermelho.
    * A validação ocorre tanto quando o usuário sai do campo (`blur`) quanto no envio final (`submit`).
* **Código Modular:**
    * O arquivo `js/scripts.js` foi refatorado em **módulos** (objetos) para organizar as funcionalidades: `Mascaras`, `Validacao`, `Templating`, `Navegacao`, e um inicializador `App`.

## 📁 Estrutura de Pastas

A estrutura de pastas do projeto permanece organizada:

/ |-- index.html (Atualizado para SPA) |-- projetos.html (Atualizado para SPA e Templating) |-- cadastro.html (Atualizado para SPA e Validação Avançada) |-- README.md (Este arquivo) | |-- css/ | |-- styles.css (Atualizado com estilos de erro) | |-- js/ | |-- scripts.js (Código modular da Entrega III) | |-- imagens/ |-- (Todas as imagens do projeto)


## 🛠️ Tecnologias Utilizadas

* **HTML5 Semântico**
* **CSS3 Avançado** (Grid, Flexbox, Variáveis, Media Queries)
* **JavaScript Avançado (ES6+)**
    * Manipulação do DOM
    * Eventos (`click`, `submit`, `blur`)
    * Fetch API (para a SPA)
    * History API (`pushState`, `popstate`)
    * DOMParser
    * Async/Await
    * Módulos (via objetos)

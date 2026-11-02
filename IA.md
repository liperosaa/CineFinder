
# Registro de Utilização de Inteligência Artificial

## 1. Identificação do projeto

- **Nome:** CineFinder — Buscador de Filmes e Séries
- **Disciplina:** Programação Web II
- **Tecnologias:** HTML5, CSS3, JavaScript e OMDb API

## 2. Objetivo

Desenvolver uma aplicação web responsiva para pesquisar filmes e séries, visualizar resultados em cartões e consultar informações sobre os títulos selecionados.

O projeto é desenvolvido em etapas, priorizando a compreensão dos conceitos fundamentais de desenvolvimento web.

## 3. Prompts utilizados

### Prompt 1 — Planejamento e estrutura inicial

> Atue como um desenvolvedor web e professor de Programação Web II.
>
> Ajude-me a planejar um projeto acadêmico chamado CineFinder, um buscador de filmes e séries.
>
> O projeto deve utilizar HTML5, CSS3, JavaScript puro e a OMDb API. Não utilize frameworks ou bibliotecas externas de interface.
>
> A aplicação deverá possuir três telas principais:
>
> 1. Página inicial com cabeçalho, campo de pesquisa e sugestões de filmes e séries.
> 2. Página de resultados com cartões contendo cartazes, títulos, anos e tipos de conteúdo.
> 3. Página de detalhes com cartaz, título, gênero, ano, sinopse e outras informações disponíveis.
>
> Sugira uma estrutura de pastas organizada e explique a função de cada arquivo. Desenvolva o projeto gradualmente, com código simples e adequado para estudantes iniciantes.

### Prompt 2 — HTML5 e CSS3 responsivos

> Ajude-me a desenvolver a estrutura HTML5 e a estilização CSS3 das páginas do CineFinder.
>
> Utilize HTML semântico, Flexbox ou CSS Grid e Media Queries para adaptar o layout a computadores, tablets e celulares.
>
> Preserve a identidade visual já definida no projeto e mantenha os arquivos separados por página e responsabilidade.
>
> Nesta etapa, não implemente JavaScript. Explique as principais partes do código e indique como testar a responsividade.

### Prompt 3 — Integração com a OMDb API

> Atue como tutor de JavaScript e ajude-me a integrar a OMDb API ao CineFinder.
>
> Explique como realizar uma requisição GET utilizando `fetch`, como tratar a resposta JSON e como lidar com erros de conexão ou resultados não encontrados.
>
> Oriente a implementação de uma pesquisa por filmes e séries usando o termo digitado pelo usuário.
>
> Não reescreva todo o projeto. Trabalhe com os arquivos e códigos existentes, explique as alterações necessárias e mantenha o código simples.

### Prompt 4 — Exibição dinâmica dos resultados

> Ajude-me a exibir os resultados da OMDb API dinamicamente no CineFinder.
>
> Os resultados devem ser gerados a partir de um vetor de objetos, utilizando JavaScript e manipulação do DOM, sem escrever os cartões individualmente no HTML.
>
> Cada cartão deve apresentar o pôster, título, ano, tipo de conteúdo e um botão para acessar os detalhes.
>
> Explique como criar os elementos, inserir os dados e adicionar eventos de interação. Preserve os estilos e a estrutura existentes.

### Prompt 5 — Página de detalhes

> Ajude-me a implementar a página de detalhes do CineFinder.
>
> Utilize o identificador IMDb do título selecionado para consultar a OMDb API e apresentar informações como pôster, título, gênero, ano, sinopse, duração e classificação, quando disponíveis.
>
> Explique como obter o parâmetro da URL, realizar a requisição e apresentar os dados dinamicamente.
>
> Trate informações ausentes e erros da API com mensagens amigáveis.

### Prompt 6 — Organização e persistência dos dados

> Ajude-me a implementar funcionalidades de organização dos títulos no CineFinder utilizando JavaScript e `localStorage`, conforme os requisitos da disciplina.
>
> Oriente a criação, listagem, edição e exclusão dos itens salvos. Explique como converter dados para JSON ao salvar e recuperá-los ao carregar a página.
>
> Utilize o código existente e explique cada alteração antes de integrá-la.

### Prompt 7 — Testes e revisão

> Revise os arquivos atuais do CineFinder considerando HTML5, CSS3, JavaScript e integração com a OMDb API.
>
> Identifique possíveis erros, problemas de responsividade, falhas de validação e dificuldades de acessibilidade.
>
> Não altere o projeto inteiro de uma vez. Liste os problemas encontrados, explique por que são problemas e sugira correções simples que eu consiga compreender e testar.

## 4. Requisitos e desenvolvimento

### Etapa 1 — HTML e CSS

- Criar a estrutura HTML5 das telas.
- Desenvolver a estilização com CSS3.
- Utilizar Flexbox ou CSS Grid.
- Implementar Media Queries para responsividade.
- Manter os arquivos organizados em pastas.
- Utilizar conteúdo estático enquanto a API não estiver integrada.

### Etapa 2 — JavaScript e API

- Implementar a busca por filmes e séries.
- Consumir a OMDb API por meio de requisições GET.
- Exibir os resultados dinamicamente a partir dos dados retornados.
- Implementar eventos como `input`, `submit` e `click`.
- Exibir mensagens para buscas vazias, resultados não encontrados e falhas na comunicação com a API.

### Etapas seguintes

- Implementar a página de detalhes dos títulos.
- Desenvolver funcionalidades de organização e persistência dos dados.
- Testar, corrigir e documentar a aplicação.

## 5. Forma de utilização da IA

A inteligência artificial foi utilizada como ferramenta de apoio para planejar a arquitetura, organizar os arquivos, orientar a implementação e auxiliar na identificação de problemas.

As sugestões foram analisadas e adaptadas ao projeto. O código utilizado deve ser revisado, testado e compreendido pelo estudante antes da entrega.


## 6. Diário de utilização

### Registro 1 — 22/10/2026 — Felipe Padson — ChatGPT

**Prompt:**  
"Analise a estrutura atual do projeto CineFinder e ajude-me a organizar os arquivos HTML, CSS e JavaScript. Explique a função de cada arquivo e sugira melhorias sem alterar a identidade visual existente."

**Resposta aproveitada:**  
Orientações para organizar os arquivos por página e responsabilidade, mantendo HTML, CSS e JavaScript separados.

**Aceitei:**  
A organização sugerida para facilitar a manutenção e a compreensão do projeto.

**Modifiquei ou rejeitei:**  
Mantivemos os nomes e caminhos de arquivos já utilizados no repositório para evitar quebrar referências existentes.

**Verificação:**  
Conferimos os caminhos dos arquivos e testamos se as páginas continuavam carregando corretamente.

---

### Registro 2 — 22/10/2026 — João Pedro Oliveira — ChatGPT

**Prompt:**  
"Ajude-me a integrar a OMDb API ao formulário de pesquisa do CineFinder usando JavaScript puro e `fetch`. Explique como enviar o termo pesquisado, tratar a resposta JSON e apresentar mensagens para campos vazios, resultados não encontrados e erros de conexão."

**Resposta aproveitada:**  
Orientações para realizar a requisição GET, validar o termo de pesquisa e tratar respostas da API.

**Aceitei:**  
A utilização de `fetch`, `async/await` e mensagens de estado para informar o usuário sobre a pesquisa.

**Modifiquei ou rejeitei:**  
Adaptamos os nomes das variáveis e seletores aos elementos já existentes no HTML do CineFinder.

**Verificação:**  
Testamos uma pesquisa válida, uma pesquisa sem resultados e o comportamento quando a requisição falha.

---

### Registro 3 — 22/10/2026 — Felipe Padson — ChatGPT

**Prompt:**  
"Explique como gerar dinamicamente os cartões de filmes e séries a partir do vetor de objetos retornado pela OMDb API. Utilize manipulação do DOM, sem inserir os cartões manualmente no HTML, e preserve as classes CSS existentes."

**Resposta aproveitada:**  
Orientações para criar elementos HTML com JavaScript, inserir título, ano, tipo e pôster, e adicionar os cartões à página.

**Aceitei:**  
A criação dos cartões por meio de uma função de renderização e o uso dos dados retornados pela API.

**Modifiquei ou rejeitei:**  
Ajustamos as classes e a estrutura dos cartões para manter a compatibilidade com o CSS do projeto.

**Verificação:**  
Realizamos pesquisas diferentes e verificamos se os cartões eram gerados de acordo com os resultados recebidos.

---

### Registro 4 — 29/10/2026 — Felipe Padson — ChatGPT

**Prompt:**  
"Ajude-me a implementar o botão 'Ver detalhes' nos cartões do CineFinder. Explique como obter o IMDb ID do título selecionado e utilizá-lo para abrir a página de detalhes."

**Resposta aproveitada:**  
Orientações para associar o identificador IMDb ao botão e encaminhar o usuário para a página de detalhes.

**Aceitei:**  
A utilização do identificador do título para buscar informações específicas, em vez de realizar uma nova pesquisa pelo nome.

**Modifiquei ou rejeitei:**  
Adaptamos o caminho da página de detalhes à estrutura de pastas do projeto.

**Verificação:**  
Clicamos nos botões de diferentes cartões e conferimos se o identificador correto era enviado na URL.

---

### Registro 5 — 29/10/2026 — Felipe Padson — ChatGPT

**Prompt:**  
"Revise o código atual do CineFinder e ajude-me a identificar problemas de responsividade, mensagens de erro e organização do JavaScript. Explique as correções sugeridas sem reescrever todo o projeto."

**Resposta aproveitada:**  
Sugestões pontuais para melhorar a responsividade, a apresentação de mensagens e a organização do código.

**Aceitei:**  
Correções que melhoraram a experiência de uso e a clareza do código.

**Modifiquei ou rejeitei:**  
Descartamos sugestões que exigiriam mudanças desnecessárias na estrutura já implementada.

**Verificação:**  
Testamos o site em diferentes larguras de tela e revisamos o funcionamento da pesquisa e da navegação.


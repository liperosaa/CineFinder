# CineFinder — Buscador de Filmes e Séries

O **CineFinder** é uma aplicação web acadêmica desenvolvida para facilitar a pesquisa de filmes e séries. Seu público-alvo são pessoas que desejam encontrar títulos, consultar informações e organizar suas opções de entretenimento.

O projeto utiliza a **OMDb API (Open Movie Database)** para obter informações como títulos, cartazes, anos de lançamento, tipos de conteúdo, gêneros e sinopses.

## Funcionalidades

### Pesquisa e navegação
- Pesquisa de filmes e séries pelo nome, com validação ao lado do campo (mínimo de 2 caracteres).
- Seção "Em destaque" gerada a partir de um vetor de objetos, com filtro por Filmes e Séries.
- Consumo de dados da OMDb API por meio de requisições GET.
- Exibição dinâmica dos resultados em cartões.
- Apresentação de cartazes, títulos, anos e tipos de conteúdo.
- Navegação para a página de detalhes de cada título.
- Consulta de informações detalhadas sobre filmes e séries, com duração convertida para horas e minutos, nota do IMDb com uma casa decimal e votos formatados.

### Minha Lista
- Adicionar filmes e séries à lista pessoal.
- Visualizar os títulos salvos.
- Editar o status de cada título:
  - Quero assistir.
  - Assistindo.
  - Concluído.
- Adicionar e editar observações pessoais.
- Atribuir uma nota pessoal de 0 a 10, com validação.
- Ver a data em que cada título foi adicionado.
- Buscar títulos pelo nome (ignorando maiúsculas e acentos) e filtrar por status.
- Remover títulos da lista com confirmação.
- Armazenar os dados utilizando `localStorage`, mantendo as alterações após atualizar a página.

### Tratamento de informações
- Mensagens de validação ao lado dos campos, sem uso de `alert`.
- Avisos para buscas sem resultados.
- Tratamento de falhas na comunicação com a API.
- Exibição de mensagens para operações realizadas na Minha Lista.

## Tecnologias utilizadas

- **HTML5:** estruturação semântica das páginas.
- **CSS3:** estilização, Flexbox, Grid e responsividade.
- **JavaScript:** manipulação do DOM, eventos, funções e operações CRUD.
- **OMDb API:** obtenção de informações sobre filmes e séries.
- **localStorage:** armazenamento local dos títulos e informações pessoais.

## Como executar

- **Online (GitHub Pages):** https://liperosaa.github.io/CineFinder/
- **Localmente:**
  1. Clone ou baixe este repositório.
  2. Abra a pasta no Visual Studio Code.
  3. Abra o `index.html` com a extensão Live Server, ou diretamente no navegador.
  4. Use a barra de pesquisa para encontrar filmes e séries, veja os detalhes e adicione-os à Minha Lista.

O projeto usa apenas HTML, CSS e JavaScript no navegador e não precisa de servidor.

## Configuração da API

A aplicação utiliza uma chave gratuita da OMDb API, declarada na constante `API_KEY` em dois arquivos:

- `js/main.js`: pesquisa de títulos;
- `js/detalhes.js`: página de detalhes.

Para usar outra chave, altere o valor nos dois arquivos:

```javascript
const API_KEY = "SUA_CHAVE_AQUI";
```

Para obter uma chave, acesse:

https://www.omdbapi.com/apikey.aspx

**Atenção:** uma chave inserida no JavaScript do navegador fica visível aos visitantes. Por isso, o projeto usa uma chave gratuita, sem dados sensíveis. A chave gratuita tem limite diário de requisições; se o limite for atingido, a API devolve um erro e o site exibe uma mensagem amigável.

## Armazenamento dos dados

O CineFinder utiliza o `localStorage` do navegador para armazenar os títulos adicionados à Minha Lista.

A chave utilizada para o armazenamento é:

```javascript
cineFinderMinhaLista
```

Os dados são convertidos para JSON utilizando `JSON.stringify()` e recuperados por meio de `JSON.parse()`.

Dessa forma, as operações de criação, leitura, atualização e exclusão são realizadas diretamente no navegador, sem necessidade de banco de dados ou servidor.

**Observação:** os dados ficam armazenados no navegador e dispositivo utilizados pelo usuário.

## Estrutura do projeto

```text
CineFinder/
├── index.html
├── pages/
│   ├── detalhes.html
│   └── minha-lista.html
├── css/
│   ├── style.css
│   ├── detalhes.css
│   └── minha-lista.css
├── js/
│   ├── main.js
│   ├── detalhes.js
│   └── minha-lista.js
├── esboco_telas/
├── IA.md
└── README.md
```

## Requisitos do Projeto Integrador

| Requisito | Onde está |
|---|---|
| R1 – HTML semântico e labels | `header`, `main`, `section`, `footer` e `label` em todos os campos (`index.html`, `minha-lista.html`) |
| R2 – Flexbox/Grid e media query | `css/style.css`, `css/minha-lista.css`, `css/detalhes.css` |
| R3 – Lista a partir de vetor | `renderizar()` e `renderizarDestaques()` (`main.js`), `renderizarMinhaLista()` (`minha-lista.js`) |
| R4 – Três tipos de evento | `submit`, `click`, `input` e `change` |
| R5 – GET em API pública | `fetch` na OMDb em `main.js` e `detalhes.js`, com mensagem amigável em caso de falha |
| R6 – CRUD com persistência | Minha Lista com `localStorage` |
| R7 – Busca ou filtro | Busca e filtro de status na Minha Lista; filtro por tipo nos destaques |
| R8 – String, Number, Math e Date | Formatação de duração, nota e votos (`detalhes.js`); nota pessoal e data de adição (`minha-lista.js`); normalização de textos |
| R9 – Validação sem `alert` | Busca (`main.js`) e nota pessoal (`minha-lista.js`) |
| R10 – README.md e IA.md | Este arquivo e o `IA.md` |
| Bônus – GitHub Pages | Site publicado em https://liperosaa.github.io/CineFinder/ |

## Integrantes e responsabilidades

- **Felipe Padson:** organização inicial do projeto; CRUD e persistência com `localStorage` da Minha Lista (R6); revisão final dos requisitos e correções da etapa final, com apoio de IA: destaques por vetor (R3), busca e filtro da Minha Lista (R7), formatação com `Number`, `Math` e `Date` (R8), validações (R9) e documentação (R10).
- **João Pedro Silva:** integração com a OMDb API, requisição GET e tratamento de erros (R5).
- **Danilo Oliveira:** exibição dinâmica dos resultados da pesquisa a partir de vetor de objetos (R3).
- **Pedro Silva:** página de detalhes e navegação a partir dos cartões.
- **Henrique Azevedo:** revisão e responsividade (R1 e R2).

## Disciplina

Projeto desenvolvido para a disciplina de **Programação Web II**, do curso de **Ciência da Computação**, como parte do Projeto Integrador do segundo semestre de 2026.
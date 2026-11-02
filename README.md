
# CineFinder — Buscador de Filmes e Séries

O CineFinder é uma aplicação web acadêmica desenvolvida para facilitar a pesquisa de filmes e séries. O público-alvo são pessoas que desejam encontrar títulos e consultar informações sobre diferentes opções de entretenimento.

O projeto utiliza a **OMDb API (Open Movie Database)** para obter informações como títulos, cartazes, anos de lançamento e tipos de conteúdo.

## Funcionalidades

- Pesquisa de filmes e séries pelo nome.
- Exibição dinâmica dos resultados em cartões.
- Apresentação de cartazes, títulos, anos e tipos de conteúdo.
- Navegação para a página de detalhes de um título.
- Mensagens para campos vazios, buscas sem resultados e falhas na API.

## Tecnologias

- HTML5
- CSS3
- JavaScript
- OMDb API

## Como executar

1. Clone ou baixe este repositório.
2. Configure sua chave da OMDb API no arquivo `js/main.js`.
3. Abra a pasta do projeto no Visual Studio Code.
4. Execute o `index.html` com a extensão Live Server.

Também é possível abrir o `index.html` diretamente no navegador, mas o Live Server é recomendado para evitar problemas de requisições locais.

## Configuração da API

A aplicação utiliza uma chave da OMDb API. No arquivo `js/main.js`, localize a constante `API_KEY` e substitua o valor de exemplo pela sua chave:

```js
const API_KEY = "6a2da98e";
```

**Atenção:** uma chave inserida no JavaScript do navegador fica visível aos visitantes. Não utilize uma chave privada ou sensível em um repositório público.

## Estrutura do projeto

```text
CineFinder/
├── index.html
├── pages/
│   ├── resultados.html
│   └── detalhes.html
├── css/
│   ├── style.css
│   ├── resultados.css
│   └── detalhes.css
├── js/
│   ├── main.js
│   ├── resultados.js
│   └── detalhes.js
├── IA.md
└── README.md
```

## Integrantes e responsabilidades

- **Felipe Padson:** Dev
- **João Pedro Silva:** Dev
- **Danilo Oliveira:** Dev
- **Pedro Silva:** Dev
- **Henrique Azevedo:** Dev

## Disciplina

Projeto desenvolvido para a disciplina de **Programação Web II**, no curso de Ciência da Computação.

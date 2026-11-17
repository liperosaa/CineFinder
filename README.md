# CineFinder — Buscador de Filmes e Séries

O **CineFinder** é uma aplicação web acadêmica desenvolvida para facilitar a pesquisa de filmes e séries. Seu público-alvo são pessoas que desejam encontrar títulos, consultar informações e organizar suas opções de entretenimento.

O projeto utiliza a **OMDb API (Open Movie Database)** para obter informações como títulos, cartazes, anos de lançamento, tipos de conteúdo, gêneros e sinopses.

## Funcionalidades

### Pesquisa e navegação
- Pesquisa de filmes e séries pelo nome.
- Consumo de dados da OMDb API por meio de requisições GET.
- Exibição dinâmica dos resultados em cartões.
- Apresentação de cartazes, títulos, anos e tipos de conteúdo.
- Navegação para a página de detalhes de cada título.
- Consulta de informações detalhadas sobre filmes e séries.

### Minha Lista
- Adicionar filmes e séries à lista pessoal.
- Visualizar os títulos salvos.
- Editar o status de cada título:
  - Quero assistir.
  - Assistindo.
  - Concluído.
- Adicionar e editar observações pessoais.
- Remover títulos da lista com confirmação.
- Armazenar os dados utilizando `localStorage`, mantendo as alterações após atualizar a página.

### Tratamento de informações
- Mensagens para campos de pesquisa vazios.
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

1. Clone ou baixe este repositório.
2. Configure sua chave da OMDb API no arquivo `js/main.js`.
3. Abra a pasta do projeto no Visual Studio Code.
4. Execute o arquivo `index.html` utilizando a extensão Live Server.
5. Utilize a barra de pesquisa para encontrar filmes e séries.
6. Acesse os detalhes dos títulos e adicione-os à Minha Lista.

Também é possível abrir o `index.html` diretamente no navegador, mas o Live Server é recomendado para evitar problemas com requisições locais.

## Configuração da API

A aplicação utiliza uma chave de acesso da OMDb API.

No arquivo `js/main.js`, localize a constante `API_KEY` e substitua o valor de exemplo pela sua chave:

```javascript
const API_KEY = "SUA_CHAVE_AQUI";
```

Para obter uma chave, acesse:

https://www.omdbapi.com/apikey.aspx

**Atenção:** uma chave inserida no JavaScript do navegador fica visível aos visitantes. Não utilize uma chave privada ou sensível em um repositório público.

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
│   ├── resultados.html
│   ├── detalhes.html
│   └── minha-lista.html
├── css/
│   ├── style.css
│   ├── resultados.css
│   └── detalhes.css
├── js/
│   ├── main.js
│   ├── resultados.js
│   ├── detalhes.js
│   └── minha-lista.js
├── IA.md
└── README.md
```

## Integrantes e responsabilidades

- **Felipe Padson:** Desenvolvimento.
- **João Pedro Silva:** Desenvolvimento.
- **Danilo Oliveira:** Desenvolvimento.
- **Pedro Silva:** Desenvolvimento.
- **Henrique Azevedo:** Desenvolvimento.

## Disciplina

Projeto desenvolvido para a disciplina de **Programação Web II**, do curso de **Ciência da Computação**, como parte do Projeto Integrador do segundo semestre de 2026.
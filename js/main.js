
const API_KEY = "6a2da98e";
const URL_BASE = "https://www.omdbapi.com/";

const formulario = document.querySelector("#form-busca");
const campoBusca = document.querySelector("#campo-busca");
const resultados = document.querySelector("#resultados");
const mensagem = document.querySelector("#mensagem");
const erroBusca = document.querySelector("#erro-busca");

const gradeDestaques = document.querySelector("#destaques-grid");
const mensagemDestaques = document.querySelector("#mensagem-destaques");
const botoesFiltro = document.querySelectorAll(".categoria[data-filtro]");

const CHAVE_LISTA = "cineFinderMinhaLista";

let filmesEncontrados = [];

// Títulos exibidos em "Em destaque" (R3: a lista vem de um vetor de objetos).
const destaques = [
    {
        titulo: "Interestelar",
        ano: 2014,
        genero: "Ficção científica",
        tipo: "movie",
        poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
    },
    {
        titulo: "Oppenheimer",
        ano: 2023,
        genero: "Drama",
        tipo: "movie",
        poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"
    },
    {
        titulo: "Coringa",
        ano: 2019,
        genero: "Suspense",
        tipo: "movie",
        poster: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
    },
    {
        titulo: "Stranger Things",
        ano: 2016,
        genero: "Ficção científica",
        tipo: "series",
        poster: "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg"
    },
    {
        titulo: "La Casa de Papel",
        ano: 2017,
        genero: "Suspense",
        tipo: "series",
        poster: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg"
    },
    {
        titulo: "The Mandalorian",
        ano: 2019,
        genero: "Aventura",
        tipo: "series",
        poster: "https://image.tmdb.org/t/p/w500/7WUHnWGx5OO145IRxPDUkQSh4C7.jpg"
    },
    {
        titulo: "Batman: O Cavaleiro das Trevas",
        ano: 2008,
        genero: "Ação",
        tipo: "movie",
        poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
    },
    {
        titulo: "Game of Thrones",
        ano: 2011,
        genero: "Fantasia",
        tipo: "series",
        poster: "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg"
    }
];

function obterMinhaLista() {
    try {
        const dados = localStorage.getItem(CHAVE_LISTA);

        if (!dados) return [];

        const lista = JSON.parse(dados);

        return Array.isArray(lista) ? lista : [];

    } catch (erro) {
        console.error("Erro ao recuperar a lista:", erro);
        return [];
    }
}

function salvarMinhaLista(lista) {
    try {
        localStorage.setItem(CHAVE_LISTA, JSON.stringify(lista));
        return true;

    } catch (erro) {
        console.error("Erro ao salvar a lista:", erro);

        mensagem.textContent =
            "Não foi possível salvar o título no navegador.";

        return false;
    }
}

// Adiciona um título à Minha Lista.
function adicionarMinhaLista(filme) {
    const lista = obterMinhaLista();

    const jaExiste = lista.some((item) => {
        return item.imdbID === filme.imdbID;
    });

    if (jaExiste) {
        window.location.href =
            `pages/minha-lista.html?item=${encodeURIComponent(filme.imdbID)}`;
        return;
    }

    const novoTitulo = {
        imdbID: filme.imdbID,
        Title: filme.Title,
        Year: filme.Year,
        Type: filme.Type,
        Poster: filme.Poster,
        status: "Quero assistir",
        observacao: "",
        nota: null,
        adicionadoEm: new Date().toISOString()
    };

    lista.push(novoTitulo);

    if (salvarMinhaLista(lista)) {
        window.location.href =
            `pages/minha-lista.html?item=${encodeURIComponent(filme.imdbID)}`;
    }
}

// Valida o termo digitado e devolve a mensagem de erro (ou "" se estiver ok).
function validarBusca(termo) {
    if (termo === "") {
        return "Digite o nome de um filme ou série.";
    }

    if (termo.length < 2) {
        return "Digite pelo menos 2 caracteres para pesquisar.";
    }

    return "";
}

// Mostra ou limpa o erro ao lado do campo de busca.
function mostrarErroBusca(texto) {
    erroBusca.textContent = texto;

    if (texto) {
        campoBusca.setAttribute("aria-invalid", "true");
    } else {
        campoBusca.removeAttribute("aria-invalid");
    }
}

// Orientação durante a digitação.
campoBusca.addEventListener("input", () => {
    const termo = campoBusca.value.trim();

    mostrarErroBusca("");

    mensagem.textContent = termo
        ? "Pressione Pesquisar para buscar os títulos."
        : "";
});

// Pesquisa na API OMDb.
formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    // Remove espaços extras no começo, no fim e repetidos no meio.
    const termo = campoBusca.value.trim().replace(/\s+/g, " ");

    const erro = validarBusca(termo);

    if (erro) {
        mostrarErroBusca(erro);
        mensagem.textContent = "";
        campoBusca.focus();
        return;
    }

    mostrarErroBusca("");

    mensagem.textContent = "Buscando...";
    resultados.innerHTML = "";
    filmesEncontrados = [];

    try {
        const parametros = new URLSearchParams({
            apikey: API_KEY,
            s: termo
        });

        const resposta = await fetch(
            `${URL_BASE}?${parametros.toString()}`
        );

        if (!resposta.ok) {
            throw new Error("Erro na comunicação com a API.");
        }

        const dados = await resposta.json();

        if (dados.Response === "False") {
            mensagem.textContent =
                dados.Error || "Nenhum resultado encontrado.";
            return;
        }

        filmesEncontrados = dados.Search || [];

        mensagem.textContent =
            `${filmesEncontrados.length} resultado(s) encontrado(s).`;

        renderizar(filmesEncontrados);

    } catch (erro) {
        console.error("Erro na busca:", erro);

        mensagem.textContent =
            "Não foi possível carregar os resultados. Verifique sua conexão e tente novamente.";
    }
});

// Renderiza os resultados da pesquisa.
function renderizar(lista) {
    resultados.innerHTML = "";

    lista.forEach((filme) => {
        const card = document.createElement("article");
        card.classList.add("filme-card");

        const imagemContainer = document.createElement("div");
        imagemContainer.classList.add("filme-imagem");

        const poster = document.createElement("img");

        poster.src = filme.Poster && filme.Poster !== "N/A"
            ? filme.Poster
            : "https://placehold.co/300x450?text=Sem+poster";

        poster.alt = `Pôster de ${filme.Title}`;
        poster.loading = "lazy";

        const etiqueta = document.createElement("span");
        etiqueta.classList.add("tipo-conteudo");

        etiqueta.textContent =
            filme.Type === "series" ? "SÉRIE" : "FILME";

        if (filme.Type === "series") {
            etiqueta.classList.add("tipo-serie");
        }

        imagemContainer.append(poster, etiqueta);

        const informacoes = document.createElement("div");
        informacoes.classList.add("filme-informacoes");

        const titulo = document.createElement("h3");
        titulo.textContent = filme.Title;

        const ano = document.createElement("p");
        ano.textContent = `${filme.Year} • ${
            filme.Type === "series" ? "Série" : "Filme"
        }`;

        // Botão de detalhes.
        const botaoDetalhes = document.createElement("button");

        botaoDetalhes.type = "button";
        botaoDetalhes.classList.add("botao-detalhes");
        botaoDetalhes.textContent = "Ver detalhes";

        botaoDetalhes.addEventListener("click", () => {
            window.location.href =
                `pages/detalhes.html?id=${encodeURIComponent(filme.imdbID)}`;
        });

        // Botão para adicionar à lista.
        const botaoSalvar = document.createElement("button");

        botaoSalvar.type = "button";
        botaoSalvar.classList.add("botao-salvar");
        botaoSalvar.textContent = "Adicionar à Minha Lista";

        botaoSalvar.addEventListener("click", () => {
            adicionarMinhaLista(filme);
        });

        informacoes.append(
            titulo,
            ano,
            botaoDetalhes,
            botaoSalvar
        );

        card.append(
            imagemContainer,
            informacoes
        );

        resultados.appendChild(card);
    });
}


// ========================================
// DESTAQUES (lista dinâmica + filtro por tipo)
// ========================================

// Cria o cartão de um destaque.
function criarCartaoDestaque(item) {
    const card = document.createElement("article");
    card.classList.add("filme-card");

    const imagemContainer = document.createElement("div");
    imagemContainer.classList.add("filme-imagem");

    const poster = document.createElement("img");
    poster.src = item.poster;
    poster.alt = `Cartaz ${item.tipo === "series" ? "da série" : "do filme"} ${item.titulo}`;
    poster.loading = "lazy";

    const etiqueta = document.createElement("span");
    etiqueta.classList.add("tipo-conteudo");
    etiqueta.textContent = item.tipo === "series" ? "SÉRIE" : "FILME";

    if (item.tipo === "series") {
        etiqueta.classList.add("tipo-serie");
    }

    imagemContainer.append(poster, etiqueta);

    const informacoes = document.createElement("div");
    informacoes.classList.add("filme-informacoes");

    const titulo = document.createElement("h3");
    titulo.textContent = item.titulo;

    const detalhes = document.createElement("p");
    detalhes.textContent = `${item.ano} • ${item.genero}`;

    informacoes.append(titulo, detalhes);
    card.append(imagemContainer, informacoes);

    return card;
}

// Desenha a lista de destaques recebida.
function renderizarDestaques(lista) {
    gradeDestaques.innerHTML = "";

    lista.forEach((item) => {
        gradeDestaques.appendChild(criarCartaoDestaque(item));
    });
}

// Filtra os destaques por tipo ("todos", "movie" ou "series").
function filtrarDestaques(tipo) {
    const filtrados = tipo === "todos"
        ? destaques
        : destaques.filter((item) => item.tipo === tipo);

    renderizarDestaques(filtrados);

    mensagemDestaques.textContent =
        `Mostrando ${filtrados.length} de ${destaques.length} destaques.`;
}

botoesFiltro.forEach((botao) => {
    botao.addEventListener("click", () => {
        botoesFiltro.forEach((outro) => {
            const ativo = outro === botao;

            outro.classList.toggle("categoria-ativa", ativo);
            outro.setAttribute("aria-pressed", String(ativo));
        });

        filtrarDestaques(botao.dataset.filtro);
    });
});

// Inicialização.
filtrarDestaques("todos");

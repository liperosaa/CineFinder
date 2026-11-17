
const API_KEY = "6a2da98e";
const URL_BASE = "https://www.omdbapi.com/";

const formulario = document.querySelector("#form-busca");
const campoBusca = document.querySelector("#campo-busca");
const resultados = document.querySelector("#resultados");
const mensagem = document.querySelector("#mensagem");

const CHAVE_LISTA = "cineFinderMinhaLista";

let filmesEncontrados = [];

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
        observacao: ""
    };

    lista.push(novoTitulo);

    if (salvarMinhaLista(lista)) {
        window.location.href =
            `pages/minha-lista.html?item=${encodeURIComponent(filme.imdbID)}`;
    }
}

// Orientação durante a digitação.
campoBusca.addEventListener("input", () => {
    const termo = campoBusca.value.trim();

    mensagem.textContent = termo
        ? "Pressione Pesquisar para buscar os títulos."
        : "";
});

// Pesquisa na API OMDb.
formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const termo = campoBusca.value.trim();

    if (!termo) {
        mensagem.textContent =
            "Digite o nome de um filme ou série.";

        campoBusca.focus();
        return;
    }

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


const API_KEY = "6a2da98e";
const URL_BASE = "https://www.omdbapi.com/";

// ========================================
// ELEMENTOS DA PÁGINA
// ========================================

const formulario = document.querySelector("#form-busca");
const campoBusca = document.querySelector("#campo-busca");
const resultados = document.querySelector("#resultados");
const mensagem = document.querySelector("#mensagem");

// Armazena os resultados da pesquisa atual.
let filmesEncontrados = [];

// Chave utilizada no armazenamento do navegador.
const CHAVE_LISTA = "cineFinderMinhaLista";

// ========================================
// 1. LOCALSTORAGE
// ========================================

// Recupera os títulos salvos no navegador.
function obterMinhaLista() {
    try {
        const dados = localStorage.getItem(CHAVE_LISTA);

        if (!dados) {
            return [];
        }

        const lista = JSON.parse(dados);

        return Array.isArray(lista) ? lista : [];

    } catch (erro) {
        console.error("Erro ao recuperar a lista:", erro);
        return [];
    }
}

// Salva a lista no navegador.
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

// ========================================
// 2. ADICIONAR TÍTULOS À MINHA LISTA
// ========================================

function adicionarMinhaLista(filme) {
    const lista = obterMinhaLista();

    // Verifica se o título já está salvo.
    const jaExiste = lista.some((item) => {
        return item.imdbID === filme.imdbID;
    });

    if (jaExiste) {
        mensagem.textContent =
            "Esse título já está na sua Minha Lista.";

        return;
    }

    // Cria o objeto com os dados do título.
    const novoTitulo = {
        imdbID: filme.imdbID,
        Title: filme.Title,
        Year: filme.Year,
        Type: filme.Type,
        Poster: filme.Poster,
        status: "Quero assistir",
        observacao: ""
    };

    // Adiciona o título à lista.
    lista.push(novoTitulo);

    // Salva a lista atualizada.
    const salvou = salvarMinhaLista(lista);

    if (salvou) {
        mensagem.textContent =
            `${filme.Title} foi adicionado à sua Minha Lista!`;
    }
}

// ========================================
// 3. EVENTO INPUT
// ========================================

// Mostra uma orientação enquanto o usuário digita.
campoBusca.addEventListener("input", () => {
    const termo = campoBusca.value.trim();

    if (termo) {
        mensagem.textContent =
            "Pressione Pesquisar para buscar os títulos.";
    } else {
        mensagem.textContent = "";
    }
});

// ========================================
// 4. EVENTO SUBMIT E CONSULTA À API
// ========================================

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
        const resposta = await fetch(
            `${URL_BASE}?apikey=${API_KEY}&s=${encodeURIComponent(termo)}`
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

        // Guarda os resultados da pesquisa.
        filmesEncontrados = dados.Search || [];

        mensagem.textContent =
            `${filmesEncontrados.length} resultado(s) encontrado(s).`;

        renderizar(filmesEncontrados);

    } catch (erro) {
        mensagem.textContent =
            "Não foi possível carregar os resultados. Verifique sua conexão e tente novamente.";

        console.error("Erro na busca:", erro);
    }
});

// ========================================
// 5. RENDERIZAÇÃO DINÂMICA DOS CARTÕES
// ========================================

function renderizar(lista) {
    resultados.innerHTML = "";

    lista.forEach((filme) => {
        // Cria o cartão.
        const card = document.createElement("article");
        card.classList.add("filme-card");

        // Container da imagem.
        const imagemContainer = document.createElement("div");
        imagemContainer.classList.add("filme-imagem");

        // Pôster.
        const poster = document.createElement("img");

        poster.src = filme.Poster !== "N/A"
            ? filme.Poster
            : "https://placehold.co/300x450?text=Sem+poster";

        poster.alt = `Pôster de ${filme.Title}`;
        poster.loading = "lazy";

        // Etiqueta do tipo de conteúdo.
        const etiqueta = document.createElement("span");
        etiqueta.classList.add("tipo-conteudo");

        etiqueta.textContent =
            filme.Type === "series" ? "SÉRIE" : "FILME";

        if (filme.Type === "series") {
            etiqueta.classList.add("tipo-serie");
        }

        imagemContainer.append(poster, etiqueta);

        // Informações do título.
        const informacoes = document.createElement("div");
        informacoes.classList.add("filme-informacoes");

        const titulo = document.createElement("h3");
        titulo.textContent = filme.Title;

        const ano = document.createElement("p");
        ano.textContent = `${filme.Year} • ${filme.Type}`;

        // ========================================
        // BOTÃO VER DETALHES
        // ========================================

        const botaoDetalhes = document.createElement("button");

        botaoDetalhes.type = "button";
        botaoDetalhes.classList.add("botao-detalhes");
        botaoDetalhes.textContent = "Ver detalhes";

        botaoDetalhes.addEventListener("click", () => {
            window.location.href =
                `pages/detalhes.html?id=${encodeURIComponent(filme.imdbID)}`;
        });

        // ========================================
        // BOTÃO ADICIONAR À MINHA LISTA
        // ========================================

        const botaoSalvar = document.createElement("button");

        botaoSalvar.type = "button";
        botaoSalvar.classList.add("botao-salvar");
        botaoSalvar.textContent = "Adicionar à Minha Lista";

        botaoSalvar.addEventListener("click", () => {
            adicionarMinhaLista(filme);
        });

        // Adiciona os elementos ao cartão.
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

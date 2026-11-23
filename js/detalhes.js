
// ========================================
// CINEFINDER - PÁGINA DE DETALHES
// ========================================

// Insira aqui sua nova chave da API OMDb.
const API_KEY = "6a2da98e";

const URL_BASE = "https://www.omdbapi.com/";
const CHAVE_LISTA = "cineFinderMinhaLista";

// ========================================
// 1. ELEMENTOS DA PÁGINA
// ========================================

const mensagemDetalhes = document.querySelector("#mensagem-detalhes");
const conteudoDetalhes = document.querySelector("#conteudo-detalhes");  


const posterDetalhes = document.querySelector("#poster-detalhes");
const tipoDetalhes = document.querySelector("#tipo-detalhes");
const tituloDetalhes = document.querySelector("#titulo-detalhes");
const subtituloDetalhes = document.querySelector("#subtitulo-detalhes");
const avaliacoesDetalhes = document.querySelector("#avaliacoes-detalhes");
const sinopseDetalhes = document.querySelector("#sinopse-detalhes");

const diretorDetalhes = document.querySelector("#diretor-detalhes");
const roteiroDetalhes = document.querySelector("#roteiro-detalhes");
const elencoDetalhes = document.querySelector("#elenco-detalhes");
const generoDetalhes = document.querySelector("#genero-detalhes");
const classificacaoDetalhes = document.querySelector("#classificacao-detalhes");
const idiomaDetalhes = document.querySelector("#idioma-detalhes");
const paisDetalhes = document.querySelector("#pais-detalhes");
const premiosDetalhes = document.querySelector("#premios-detalhes");

const botaoAdicionar = document.querySelector("#botao-adicionar");
const mensagemLista = document.querySelector("#mensagem-lista-detalhes");

// Dados do título consultado.
let filmeAtual = null;

// ========================================
// 2. IDENTIFICAR O IMDB ID PELA URL
// ========================================

const parametrosURL = new URLSearchParams(window.location.search);
const imdbID = parametrosURL.get("id");

// ========================================
// 3. LOCALSTORAGE
// ========================================

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

function salvarMinhaLista(lista) {
    try {
        localStorage.setItem(CHAVE_LISTA, JSON.stringify(lista));
        return true;

    } catch (erro) {
        console.error("Erro ao salvar a lista:", erro);
        mensagemLista.textContent =
            "Não foi possível salvar o título no navegador.";

        return false;
    }
}

// ========================================
// 4. CONSULTAR A API OMDb
// ========================================

async function buscarDetalhes() {

    // Verifica se existe um IMDb ID.
    if (!imdbID || !/^tt\d+$/.test(imdbID)) {
        mensagemDetalhes.textContent =
            "Identificador inválido. Selecione um título pela página inicial.";

        return;
    }

    if (
        !API_KEY ||
        API_KEY === "SUA_NOVA_CHAVE_OMDB"
    ) {
        mensagemDetalhes.textContent =
            "Configure sua chave da API OMDb no arquivo detalhes.js.";

        return;
    }

    try {
        mensagemDetalhes.textContent =
            "Carregando informações do título...";

        const url =
            `${URL_BASE}?apikey=${encodeURIComponent(API_KEY)}` +
            `&i=${encodeURIComponent(imdbID)}&plot=full`;

        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error("Falha na comunicação com a API.");
        }

        const dados = await resposta.json();

        if (dados.Response === "False") {
            mensagemDetalhes.textContent =
                dados.Error || "Não foi possível encontrar esse título.";

            return;
        }

        filmeAtual = dados;

        renderizarDetalhes(dados);

    } catch (erro) {
        console.error("Erro ao buscar detalhes:", erro);

        mensagemDetalhes.textContent =
            "Não foi possível carregar os detalhes. Verifique sua conexão e tente novamente.";
    }
}

// ========================================
// 5. FUNÇÕES AUXILIARES
// ========================================

// Exibe um valor ou uma mensagem padrão.
function obterValor(valor) {
    if (!valor || valor === "N/A") {
        return "Não informado";
    }

    return valor;
}

// Converte a duração da API (ex.: "148 min") em horas e minutos (ex.: "2h 28min").
function formatarDuracao(duracao) {
    const minutosTotais = parseInt(duracao, 10);

    if (Number.isNaN(minutosTotais)) {
        return "Não informado";
    }

    const horas = Math.floor(minutosTotais / 60);
    const minutos = minutosTotais % 60;

    return horas > 0
        ? `${horas}h ${String(minutos).padStart(2, "0")}min`
        : `${minutos}min`;
}

// Converte a nota do IMDb (texto, ex.: "8.7") em número com uma casa decimal e vírgula.
function formatarNota(nota) {
    const valor = Number(nota);

    if (!nota || Number.isNaN(valor)) {
        return "";
    }

    return valor.toFixed(1).replace(".", ",");
}

// Converte os votos (texto, ex.: "2,100,000") em número formatado em pt-BR.
function formatarVotos(votos) {
    const valor = Number(String(votos).replace(/,/g, ""));

    if (!votos || Number.isNaN(valor)) {
        return "";
    }

    return valor.toLocaleString("pt-BR");
}

// Verifica se a URL do pôster é válida.
function obterPoster(poster) {
    if (!poster || poster === "N/A") {
        return "https://placehold.co/500x750?text=Sem+poster";
    }

    try {
        const url = new URL(poster);

        if (url.protocol === "https:" || url.protocol === "http:") {
            return url.href;
        }

    } catch (erro) {
        console.warn("URL de pôster inválida:", erro);
    }

    return "https://placehold.co/500x750?text=Sem+poster";
}

// ========================================
// 6. RENDERIZAR AS INFORMAÇÕES
// ========================================

function renderizarDetalhes(filme) {

    // Informações principais.
    posterDetalhes.src = obterPoster(filme.Poster);
    posterDetalhes.alt = `Pôster de ${filme.Title}`;

    posterDetalhes.onerror = () => {
        posterDetalhes.src =
            "https://placehold.co/500x750?text=Sem+poster";
    };

    tipoDetalhes.textContent =
        filme.Type === "series" ? "SÉRIE" : "FILME";

    tituloDetalhes.textContent = obterValor(filme.Title);

    subtituloDetalhes.textContent = [
        obterValor(filme.Year),
        obterValor(filme.Rated),
        formatarDuracao(filme.Runtime)
    ].filter(valor => valor !== "Não informado").join(" • ");

    // Sinopse.
    sinopseDetalhes.textContent = obterValor(filme.Plot);

    // Ficha técnica.
    diretorDetalhes.textContent = obterValor(filme.Director);
    roteiroDetalhes.textContent = obterValor(filme.Writer);
    elencoDetalhes.textContent = obterValor(filme.Actors);
    generoDetalhes.textContent = obterValor(filme.Genre);
    classificacaoDetalhes.textContent = obterValor(filme.Rated);
    idiomaDetalhes.textContent = obterValor(filme.Language);
    paisDetalhes.textContent = obterValor(filme.Country);
    premiosDetalhes.textContent = obterValor(filme.Awards);

    // Avaliações.
    renderizarAvaliacoes(filme);

    // Atualiza o título da aba.
    document.title = `${filme.Title} | CineFinder`;

    // Exibe o conteúdo.
    mensagemDetalhes.textContent = "";
    conteudoDetalhes.hidden = false;

    // Verifica se o título já está salvo.
    verificarTituloSalvo();
}

// ========================================
// 7. AVALIAÇÕES
// ========================================

function renderizarAvaliacoes(filme) {

    avaliacoesDetalhes.innerHTML = "";

    const notaFormatada = formatarNota(filme.imdbRating);

    const avaliacaoIMDb = notaFormatada
        ? `IMDb: ${notaFormatada}/10`
        : "IMDb: Sem avaliação";

    const votosFormatados = formatarVotos(filme.imdbVotes);

    const votos = votosFormatados
        ? `${votosFormatados} votos`
        : "";

    const elementoIMDb = document.createElement("span");
    elementoIMDb.classList.add("avaliacao-imdb");
    elementoIMDb.textContent = `★ ${avaliacaoIMDb}`;

    avaliacoesDetalhes.appendChild(elementoIMDb);

    if (votos) {
        const elementoVotos = document.createElement("span");
        elementoVotos.classList.add("avaliacao-votos");
        elementoVotos.textContent = votos;

        avaliacoesDetalhes.appendChild(elementoVotos);
    }

    // Outras avaliações disponíveis na API.
    if (Array.isArray(filme.Ratings)) {

        filme.Ratings.forEach((avaliacao) => {

            const elemento = document.createElement("span");

            elemento.classList.add("outra-avaliacao");

            elemento.textContent =
                `${avaliacao.Source}: ${avaliacao.Value}`;

            avaliacoesDetalhes.appendChild(elemento);
        });
    }
}

// ========================================
// 8. VERIFICAR SE JÁ ESTÁ NA MINHA LISTA
// ========================================

function verificarTituloSalvo() {

    const lista = obterMinhaLista();

    const jaExiste = lista.some((item) => {
        return item.imdbID === filmeAtual.imdbID;
    });

    if (jaExiste) {
        botaoAdicionar.textContent =
            "✓ Já está na Minha Lista";

        botaoAdicionar.disabled = true;

        botaoAdicionar.classList.add("botao-ja-adicionado");

    } else {
        botaoAdicionar.textContent =
            "+ Adicionar à Minha Lista";

        botaoAdicionar.disabled = false;

        botaoAdicionar.classList.remove("botao-ja-adicionado");
    }
}

// ========================================
// 9. ADICIONAR À MINHA LISTA
// ========================================

function adicionarMinhaLista() {

    if (!filmeAtual) {
        mensagemLista.textContent =
            "Não foi possível identificar o título.";

        return;
    }

    const lista = obterMinhaLista();

    const jaExiste = lista.some((item) => {
        return item.imdbID === filmeAtual.imdbID;
    });

    if (jaExiste) {
        mensagemLista.textContent =
            "Esse título já está na sua Minha Lista.";

        verificarTituloSalvo();
        return;
    }

    // Mantém a mesma estrutura utilizada pelo main.js.
    const novoTitulo = {
        imdbID: filmeAtual.imdbID,
        Title: filmeAtual.Title,
        Year: filmeAtual.Year,
        Type: filmeAtual.Type,
        Poster: filmeAtual.Poster,
        status: "Quero assistir",
        observacao: "",
        nota: null,
        adicionadoEm: new Date().toISOString()
    };

    lista.push(novoTitulo);

    if (salvarMinhaLista(lista)) {

        mensagemLista.textContent =
            `${filmeAtual.Title} foi adicionado à sua Minha Lista!`;

        verificarTituloSalvo();
    }
}

// ========================================
// 10. EVENTO DO BOTÃO
// ========================================

botaoAdicionar.addEventListener("click", adicionarMinhaLista);

// ========================================
// 11. INICIALIZAÇÃO
// ========================================

buscarDetalhes();

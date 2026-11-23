
const listaFilmes = document.querySelector("#lista-filmes");
const mensagemLista = document.querySelector("#mensagem-lista");
const contadorLista = document.querySelector("#contador-lista");

const CHAVE_LISTA = "cineFinderMinhaLista";

const formFiltros = document.querySelector("#filtros-lista");
const campoBuscaLista = document.querySelector("#busca-lista");
const campoFiltroStatus = document.querySelector("#filtro-status");

// Filtros ativos (R7).
let termoBusca = "";
let statusFiltrado = "todos";

// Padroniza o texto para comparar: minúsculas e sem acentos.
function normalizarTexto(texto) {
    return String(texto)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

// Formata a data de adição (ex.: "22/11/2026 · hoje" ou "há 3 dias").
function formatarDataAdicao(dataIso) {
    const data = new Date(dataIso);

    if (!dataIso || Number.isNaN(data.getTime())) {
        return "";
    }

    const dias = Math.floor((Date.now() - data.getTime()) / 86400000);

    let quando = `há ${dias} dias`;

    if (dias <= 0) {
        quando = "hoje";
    } else if (dias === 1) {
        quando = "ontem";
    }

    return `Adicionado em ${data.toLocaleDateString("pt-BR")} (${quando})`;
}

// Converte o texto da nota em número entre 0 e 10, ou devolve null se for inválido.
function converterNota(texto) {
    const valor = Number(texto.replace(",", "."));

    if (Number.isNaN(valor) || valor < 0 || valor > 10) {
        return null;
    }

    return Math.round(valor * 10) / 10;
}

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

        mensagemLista.textContent =
            "Não foi possível salvar as alterações.";

        return false;
    }
}

// Atualiza o contador da lista.
function atualizarContador(quantidade) {
    if (!contadorLista) return;

    contadorLista.textContent =
        quantidade === 1
            ? "1 título salvo"
            : `${quantidade} títulos salvos`;
}

// Atualiza status e observações.
function atualizarTitulo(imdbID, novoStatus, novaObservacao, novaNota) {
    const lista = obterMinhaLista();

    const indice = lista.findIndex((filme) => {
        return filme.imdbID === imdbID;
    });

    if (indice === -1) {
        mensagemLista.textContent =
            "Não foi possível encontrar esse título.";
        return;
    }

    lista[indice].status = novoStatus;
    lista[indice].observacao = novaObservacao;
    lista[indice].nota = novaNota;

    if (salvarMinhaLista(lista)) {
        mensagemLista.textContent =
            `${lista[indice].Title}: alterações salvas com sucesso!`;
    }
}

// Exclui um título.
function excluirTitulo(imdbID) {
    const lista = obterMinhaLista();

    const filme = lista.find((item) => {
        return item.imdbID === imdbID;
    });

    if (!filme) {
        mensagemLista.textContent =
            "Não foi possível encontrar esse título.";
        return;
    }

    const confirmar = window.confirm(
        `Deseja realmente remover "${filme.Title}" da sua lista?`
    );

    if (!confirmar) return;

    const novaLista = lista.filter((item) => {
        return item.imdbID !== imdbID;
    });

    if (salvarMinhaLista(novaLista)) {
        renderizarMinhaLista();

        mensagemLista.textContent =
            `${filme.Title} foi removido da sua lista.`;
    }
}

// Cria um cartão individual.
function criarCartao(filme) {
    const card = document.createElement("article");
    card.classList.add("filme-card");

    // Identificador utilizado para localizar o cartão.
    card.dataset.imdbId = filme.imdbID;

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

    // Campo de status.
    const labelStatus = document.createElement("label");
    labelStatus.classList.add("label-lista");
    labelStatus.textContent = "Status";

    const campoStatus = document.createElement("select");
    campoStatus.classList.add("campo-lista");
    campoStatus.setAttribute("aria-label", `Status de ${filme.Title}`);

    const statusDisponiveis = [
        "Quero assistir",
        "Assistindo",
        "Concluído"
    ];

    statusDisponiveis.forEach((status) => {
        const opcao = document.createElement("option");

        opcao.value = status;
        opcao.textContent = status;

        campoStatus.appendChild(opcao);
    });

    campoStatus.value = statusDisponiveis.includes(filme.status)
        ? filme.status
        : "Quero assistir";

    labelStatus.appendChild(campoStatus);

    // Campo de nota pessoal (0 a 10), com validação ao lado do campo.
    const labelNota = document.createElement("label");
    labelNota.classList.add("label-lista");
    labelNota.textContent = "Minha nota (0 a 10)";

    const campoNota = document.createElement("input");
    campoNota.type = "text";
    campoNota.inputMode = "decimal";
    campoNota.classList.add("campo-lista");
    campoNota.placeholder = "Ex.: 8,5";
    campoNota.maxLength = 4;

    campoNota.value = typeof filme.nota === "number"
        ? String(filme.nota).replace(".", ",")
        : "";

    const erroNota = document.createElement("p");
    erroNota.classList.add("erro-campo");
    erroNota.setAttribute("role", "alert");

    campoNota.addEventListener("input", () => {
        erroNota.textContent = "";
        campoNota.removeAttribute("aria-invalid");
    });

    labelNota.append(campoNota, erroNota);

    // Campo de observações.
    const labelObservacao = document.createElement("label");
    labelObservacao.classList.add("label-lista");
    labelObservacao.textContent = "Observações";

    const campoObservacao = document.createElement("textarea");

    campoObservacao.classList.add("campo-lista");
    campoObservacao.rows = 3;
    campoObservacao.maxLength = 500;
    campoObservacao.placeholder =
        "Escreva suas observações sobre este título...";

    campoObservacao.setAttribute(
        "aria-label",
        `Observações sobre ${filme.Title}`
    );

    campoObservacao.value = filme.observacao || "";

    labelObservacao.appendChild(campoObservacao);

    // Botão salvar.
    const botaoSalvar = document.createElement("button");

    botaoSalvar.type = "button";
    botaoSalvar.classList.add("botao-detalhes");
    botaoSalvar.textContent = "Salvar alterações";

    botaoSalvar.addEventListener("click", () => {
        const textoNota = campoNota.value.trim();
        let nota = null;

        if (textoNota !== "") {
            nota = converterNota(textoNota);

            if (nota === null) {
                erroNota.textContent = "Informe uma nota entre 0 e 10.";
                campoNota.setAttribute("aria-invalid", "true");
                campoNota.focus();
                return;
            }

            campoNota.value = String(nota).replace(".", ",");
        }

        atualizarTitulo(
            filme.imdbID,
            campoStatus.value,
            campoObservacao.value.trim(),
            nota
        );
    });

    // Botão excluir.
    const botaoExcluir = document.createElement("button");

    botaoExcluir.type = "button";
    botaoExcluir.classList.add("botao-excluir");
    botaoExcluir.textContent = "Remover da lista";

    botaoExcluir.addEventListener("click", () => {
        excluirTitulo(filme.imdbID);
    });

    const dataAdicao = document.createElement("p");
    dataAdicao.classList.add("data-adicao");
    dataAdicao.textContent = formatarDataAdicao(filme.adicionadoEm);

    informacoes.append(
        titulo,
        ano,
        dataAdicao,
        labelStatus,
        labelNota,
        labelObservacao,
        botaoSalvar,
        botaoExcluir
    );

    card.append(imagemContainer, informacoes);

    return card;
}

// Destaca e posiciona a página no título adicionado.
function destacarTituloAdicionado() {
    const parametros = new URLSearchParams(window.location.search);
    const imdbID = parametros.get("item");

    if (!imdbID) return;

    const cartao = Array.from(
        listaFilmes.querySelectorAll(".filme-card")
    ).find((elemento) => elemento.dataset.imdbId === imdbID);

    if (!cartao) {
        mensagemLista.textContent =
            "O título solicitado não foi encontrado na sua lista.";
        return;
    }

    cartao.classList.add("filme-card-destacado");

    requestAnimationFrame(() => {
        cartao.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });

    const titulo = cartao.querySelector("h3");

    if (titulo) {
        mensagemLista.textContent =
            `${titulo.textContent} está na sua lista.`;
    }
}

// Aplica a busca por título e o filtro de status sobre a lista salva.
function filtrarLista(lista) {
    const termo = normalizarTexto(termoBusca);

    return lista.filter((filme) => {
        const combinaTitulo = normalizarTexto(filme.Title).includes(termo);
        const combinaStatus =
            statusFiltrado === "todos" || filme.status === statusFiltrado;

        return combinaTitulo && combinaStatus;
    });
}

// Evita rolar a página de novo toda vez que um filtro mudar.
let primeiraRenderizacao = true;

// Renderiza a lista (já filtrada).
function renderizarMinhaLista() {
    const lista = obterMinhaLista();
    const filtrada = filtrarLista(lista);

    listaFilmes.innerHTML = "";

    atualizarContador(lista.length);

    if (lista.length === 0) {
        const vazio = document.createElement("div");
        vazio.classList.add("lista-vazia");

        const icone = document.createElement("span");
        icone.classList.add("lista-vazia-icone");
        icone.textContent = "＋";

        const titulo = document.createElement("h2");
        titulo.textContent = "Sua lista está vazia";

        const descricao = document.createElement("p");
        descricao.textContent =
            "Explore o CineFinder e adicione filmes e séries que deseja assistir.";

        const link = document.createElement("a");
        link.href = "../index.html";
        link.classList.add("botao-voltar");
        link.textContent = "Explorar títulos";

        vazio.append(icone, titulo, descricao, link);
        listaFilmes.appendChild(vazio);

        mensagemLista.textContent = "";
        return;
    }

    if (filtrada.length === 0) {
        const vazio = document.createElement("div");
        vazio.classList.add("lista-vazia");

        const titulo = document.createElement("h2");
        titulo.textContent = "Nenhum título encontrado";

        const descricao = document.createElement("p");
        descricao.textContent =
            "Tente outro termo de busca ou mude o filtro de status.";

        vazio.append(titulo, descricao);
        listaFilmes.appendChild(vazio);

        mensagemLista.textContent =
            `Mostrando 0 de ${lista.length} título(s).`;
        return;
    }

    mensagemLista.textContent =
        `Mostrando ${filtrada.length} de ${lista.length} título(s).`;

    filtrada.forEach((filme) => {
        const card = criarCartao(filme);
        listaFilmes.appendChild(card);
    });

    if (primeiraRenderizacao) {
        primeiraRenderizacao = false;
        destacarTituloAdicionado();
    }
}

// Eventos dos filtros.
campoBuscaLista.addEventListener("input", () => {
    termoBusca = campoBuscaLista.value;
    renderizarMinhaLista();
});

campoFiltroStatus.addEventListener("change", () => {
    statusFiltrado = campoFiltroStatus.value;
    renderizarMinhaLista();
});

// Evita recarregar a página ao apertar Enter no campo de busca.
formFiltros.addEventListener("submit", (evento) => {
    evento.preventDefault();
});

// Inicialização.
renderizarMinhaLista();

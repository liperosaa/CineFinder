
const listaFilmes = document.querySelector("#lista-filmes");
const mensagemLista = document.querySelector("#mensagem-lista");
const contadorLista = document.querySelector("#contador-lista");

const CHAVE_LISTA = "cineFinderMinhaLista";

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
function atualizarTitulo(imdbID, novoStatus, novaObservacao) {
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
        atualizarTitulo(
            filme.imdbID,
            campoStatus.value,
            campoObservacao.value.trim()
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

    informacoes.append(
        titulo,
        ano,
        labelStatus,
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

// Renderiza toda a lista.
function renderizarMinhaLista() {
    const lista = obterMinhaLista();

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

    mensagemLista.textContent =
        `${lista.length} título(s) na sua lista.`;

    lista.forEach((filme) => {
        const card = criarCartao(filme);
        listaFilmes.appendChild(card);
    });

    destacarTituloAdicionado();
}

// Inicialização.
renderizarMinhaLista();

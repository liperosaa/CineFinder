
// ========================================
// 1. ELEMENTOS DA PÁGINA
// ========================================

const listaFilmes = document.querySelector("#lista-filmes");
const mensagemLista = document.querySelector("#mensagem-lista");

const CHAVE_LISTA = "cineFinderMinhaLista";

// ========================================
// 2. RECUPERAR E SALVAR OS DADOS
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
            "Não foi possível salvar as alterações.";

        return false;
    }
}

// ========================================
// 3. ATUALIZAR UM TÍTULO
// ========================================

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

    // Atualiza os dados do título.
    lista[indice].status = novoStatus;
    lista[indice].observacao = novaObservacao;

    if (salvarMinhaLista(lista)) {
        mensagemLista.textContent =
            `${lista[indice].Title}: alterações salvas com sucesso!`;
    }
}

// ========================================
// 4. EXCLUIR UM TÍTULO
// ========================================

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

    if (!confirmar) {
        return;
    }

    const novaLista = lista.filter((item) => {
        return item.imdbID !== imdbID;
    });

    if (salvarMinhaLista(novaLista)) {
        mensagemLista.textContent =
            `${filme.Title} foi removido da sua lista!`;

        renderizarMinhaLista();
    }
}

// ========================================
// 5. EXIBIR OS FILMES E SÉRIES
// ========================================

function renderizarMinhaLista() {
    const lista = obterMinhaLista();

    listaFilmes.innerHTML = "";

    if (lista.length === 0) {
        mensagemLista.textContent =
            "Sua lista está vazia. Pesquise e adicione filmes ou séries!";

        return;
    }

    mensagemLista.textContent =
        `${lista.length} título(s) na sua lista.`;

    lista.forEach((filme) => {

        // Cartão do título.
        const card = document.createElement("article");
        card.classList.add("filme-card");

        // Imagem.
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

        // Informações.
        const informacoes = document.createElement("div");
        informacoes.classList.add("filme-informacoes");

        const titulo = document.createElement("h3");
        titulo.textContent = filme.Title;

        const ano = document.createElement("p");
        ano.textContent = `${filme.Year} • ${filme.Type}`;

        // ========================================
        // CAMPO DE STATUS
        // ========================================

        const labelStatus = document.createElement("label");
        labelStatus.classList.add("label-lista");
        labelStatus.textContent = "Status:";

        const campoStatus = document.createElement("select");
        campoStatus.classList.add("campo-lista");

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

        // ========================================
        // CAMPO DE OBSERVAÇÕES
        // ========================================

        const labelObservacao = document.createElement("label");
        labelObservacao.classList.add("label-lista");
        labelObservacao.textContent = "Observações:";

        const campoObservacao = document.createElement("textarea");

        campoObservacao.classList.add("campo-lista");
        campoObservacao.rows = 3;
        campoObservacao.maxLength = 500;
        campoObservacao.placeholder =
            "Escreva suas observações sobre este título...";

        campoObservacao.value = filme.observacao || "";

        labelObservacao.appendChild(campoObservacao);

        // ========================================
        // BOTÃO SALVAR ALTERAÇÕES
        // ========================================

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

        // ========================================
        // BOTÃO REMOVER
        // ========================================

        const botaoExcluir = document.createElement("button");

        botaoExcluir.type = "button";
        botaoExcluir.classList.add("botao-excluir");
        botaoExcluir.textContent = "Remover da lista";

        botaoExcluir.addEventListener("click", () => {
            excluirTitulo(filme.imdbID);
        });

        // ========================================
        // MONTAGEM DO CARTÃO
        // ========================================

        informacoes.append(
            titulo,
            ano,
            labelStatus,
            labelObservacao,
            botaoSalvar,
            botaoExcluir
        );

        card.append(
            imagemContainer,
            informacoes
        );

        listaFilmes.appendChild(card);
    });
}

// ========================================
// 6. INICIALIZAÇÃO
// ========================================

renderizarMinhaLista();

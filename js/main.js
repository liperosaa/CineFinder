
const API_KEY = "6a2da98e";
const URL_BASE = "https://www.omdbapi.com/";

const formulario = document.querySelector("#form-busca");
const campoBusca = document.querySelector("#campo-busca");
const resultados = document.querySelector("#resultados");
const mensagem = document.querySelector("#mensagem");

// Evento 1: input
// Mostra uma orientação enquanto o usuário digita.
campoBusca.addEventListener("input", () => {
    const termo = campoBusca.value.trim();

    if (termo) {
        mensagem.textContent = "Pressione Pesquisar para buscar os títulos.";
    } else {
        mensagem.textContent = "";
    }
});

// Evento 2: submit
// Consulta a API quando o formulário é enviado.
formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const termo = campoBusca.value.trim();

    if (!termo) {
        mensagem.textContent = "Digite o nome de um filme ou série.";
        campoBusca.focus();
        return;
    }

    mensagem.textContent = "Buscando...";
    resultados.innerHTML = "";

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

        mensagem.textContent =
            `${dados.Search.length} resultado(s) encontrado(s).`;

        renderizar(dados.Search);

    } catch (erro) {
        mensagem.textContent =
            "Não foi possível carregar os resultados. Verifique sua conexão e tente novamente.";

        console.error("Erro na busca:", erro);
    }
});

// Cria os cards dinamicamente com os objetos retornados pela API.
function renderizar(lista) {
    resultados.innerHTML = "";

    lista.forEach((filme) => {
        const card = document.createElement("article");
        card.classList.add("filme-card");

        const imagemContainer = document.createElement("div");
        imagemContainer.classList.add("filme-imagem");

        const poster = document.createElement("img");
        poster.src = filme.Poster !== "N/A"
            ? filme.Poster
            : "https://placehold.co/300x450?text=Sem+poster";
        poster.alt = `Pôster de ${filme.Title}`;
        poster.loading = "lazy";

        const etiqueta = document.createElement("span");
        etiqueta.classList.add("tipo-conteudo");
        etiqueta.textContent = filme.Type === "series" ? "SÉRIE" : "FILME";

        if (filme.Type === "series") {
            etiqueta.classList.add("tipo-serie");
        }

        imagemContainer.append(poster, etiqueta);

        const informacoes = document.createElement("div");
        informacoes.classList.add("filme-informacoes");

        const titulo = document.createElement("h3");
        titulo.textContent = filme.Title;

        const ano = document.createElement("p");
        ano.textContent = `${filme.Year} • ${filme.Type}`;

        const botao = document.createElement("button");
        botao.type = "button";
        botao.classList.add("botao-detalhes");
        botao.textContent = "Ver detalhes";
        botao.dataset.id = filme.imdbID;

        informacoes.append(titulo, ano, botao);
        card.append(imagemContainer, informacoes);

        resultados.appendChild(card);
    });
}

// Evento 3: click
// Usa delegação de eventos para os botões criados dinamicamente.
resultados.addEventListener("click", (evento) => {
    const botao = evento.target.closest("button[data-id]");

    if (botao) {
        const id = botao.dataset.id;

        window.location.href =
            `pages/detalhes.html?id=${encodeURIComponent(id)}`;
    }
});

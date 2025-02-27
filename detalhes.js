document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const type = urlParams.get("type");

    if (!id || !type) {
        alert("ID ou Tipo de mídia não encontrado.");
        return;
    }

    const apiKey = '6fef90efb83322056c9bf84cdde87872'; // Substitua pela sua chave da API
    const mediaContainer = document.getElementById("media-details");

    async function fetchMediaDetails(id, type) {
        try {
            const response = await fetch(https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=pt-BR);
            const data = await response.json();

            // Verificar se a API retornou algum erro
            if (data.errors) {
                console.error('Erro ao buscar dados:', data.errors);
                alert("Não foi possível encontrar a mídia. Verifique o ID.");
                return null;
            }

            // Validar se os dados necessários existem
            if (!data.title && !data.name) {
                console.error("Título não encontrado na resposta da API.");
                alert("Título não encontrado na resposta da API.");
                return null;
            }

            return {
                title: data.title || data.name,
                image: data.poster_path ? https://image.tmdb.org/t/p/w500${data.poster_path} : '',
                backdrop: data.backdrop_path ? https://image.tmdb.org/t/p/w1280${data.backdrop_path} : '',
                description: data.overview || "Descrição não disponível",
                releaseDate: data.release_date || data.first_air_date || "Data não disponível",
                voteAverage: data.vote_average || "Nota não disponível",
                genres: data.genres.map(g => g.name).join(', ') || "Gêneros não disponíveis",
                runtime: data.runtime ? ${data.runtime} min : 'Duração não disponível',
                seasons: data.seasons || []
            };
        } catch (error) {
            console.error("Erro ao fazer a requisição à API:", error);
            alert("Erro ao conectar à API. Verifique a conexão.");
            return null;
        }
    }

    async function populateDetails() {
        const mediaDetails = await fetchMediaDetails(id, type);

        if (!mediaDetails) {
            console.error("Não foi possível obter os detalhes para o media id:", id);
            return;
        }

        // Preencher informações da mídia
        document.getElementById("media-title").textContent = mediaDetails.title;
        document.getElementById("media-description").textContent = mediaDetails.description;
        document.getElementById("media-release-date").textContent = mediaDetails.releaseDate;
        document.getElementById("media-vote-average").textContent = mediaDetails.voteAverage;
        document.getElementById("media-genres").textContent = mediaDetails.genres;
        document.getElementById("media-runtime").textContent = mediaDetails.runtime;

        // Imagens
        if (mediaDetails.image) {
            document.getElementById("media-poster").src = mediaDetails.image;
        }
        if (mediaDetails.backdrop) {
            document.getElementById("media-backdrop").src = mediaDetails.backdrop;
        }

        // Botão de assistir
        const watchButton = document.getElementById("media-watch-btn");
        watchButton.onclick = () => {
            window.location.href = https://t.me/yourTelegramLink/${id};
        };

        // Preencher temporadas (se for série)
        if (mediaDetails.seasons.length > 0) {
            const seasonsContainer = document.getElementById("seasons");
            mediaDetails.seasons.forEach((season) => {
                const seasonButton = document.createElement("button");
                seasonButton.classList.add("season-btn");
                seasonButton.textContent = Temporada ${season.season};
                seasonButton.onclick = () => {
                    window.location.href = season.html?id=${id}&season=${season.season}&type=${type};
                };
                seasonsContainer.appendChild(seasonButton);
            });
        } else {
            document.getElementById("seasons").style.display = 'none';
        }
    }

    populateDetails();
});

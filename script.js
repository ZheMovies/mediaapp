document.addEventListener("DOMContentLoaded", function () {
    const mediaList = document.getElementById("media-list");

    // Exemplo de dados
    const mediaData = [
        {
            id: 199,
            type: 'tv',
            title: 'Game of Thrones',
            image: 'https://image.tmdb.org/t/p/w500/5bRrYy0HZt3nUq9fRrn0y5sYWoi.jpg',
            voteAverage: 8.4,
            releaseDate: '2011-04-17'
        },
        {
            id: 299536,
            type: 'movie',
            title: 'Avengers: Endgame',
            image: 'https://image.tmdb.org/t/p/w500/3h3bp9B0VVfu4uB2K9qFq9mp39S.jpg',
            voteAverage: 8.4,
            releaseDate: '2019-04-26'
        }
    ];

    // Função para criar o card
    function createCard(media) {
        const card = document.createElement("div");
        card.classList.add("media-card");

        const img = document.createElement("img");
        img.src = media.image;
        img.alt = media.title;
        img.classList.add("media-img");

        const title = document.createElement("h3");
        title.textContent = media.title;
        title.classList.add("media-title");

        const releaseDate = document.createElement("p");
        releaseDate.textContent = Lançamento: ${media.releaseDate};
        releaseDate.classList.add("media-release");

        const voteAverage = document.createElement("p");
        voteAverage.textContent = Nota: ${media.voteAverage};
        voteAverage.classList.add("media-vote");

        const button = document.createElement("button");
        button.textContent = "Assistir";
        button.classList.add("watch-btn");
        button.onclick = function () {
            window.location.href = detalhe.html?id=${media.id}&type=${media.type};
        };

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(releaseDate);
        card.appendChild(voteAverage);
        card.appendChild(button);

        mediaList.appendChild(card);
    }

    // Loop para criar os cards a partir dos dados
    mediaData.forEach(createCard);
});

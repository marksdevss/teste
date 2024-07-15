document.addEventListener('DOMContentLoaded', () => {
    loadRecommendations();

    function loadRecommendations() {
        const library = JSON.parse(localStorage.getItem('library')) || [];
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const genres = {};

        // Coletar gêneros dos itens na biblioteca e lista de desejos
        const fetchGenrePromises = library.concat(wishlist).map(item => {
            return fetch(`https://kitsu.io/api/edge/${item.type}/${item.id}`)
                .then(response => response.json())
                .then(data => {
                    const itemGenres = data.data.relationships.genres.data || [];
                    itemGenres.forEach(genre => {
                        if (!genres[genre.id]) genres[genre.id] = 0;
                        genres[genre.id]++;
                    });
                });
        });

        // Buscar recomendações com base nos gêneros mais comuns
        Promise.all(fetchGenrePromises).then(() => {
            const topGenres = Object.keys(genres).sort((a, b) => genres[b] - genres[a]).slice(0, 3);
            const recommendationPromises = topGenres.map(genre => {
                return fetch(`https://kitsu.io/api/edge/anime?filter[genres]=${genre}&page[limit]=5`)
                    .then(response => response.json())
                    .then(data => data.data);
            });

            Promise.all(recommendationPromises).then(recommendationGroups => {
                const recommendationsContainer = document.getElementById('recommendations-container');
                recommendationsContainer.innerHTML = '';
                recommendationGroups.flat().forEach(item => {
                    const recommendationItem = document.createElement('div');
                    recommendationItem.classList.add('recommendation-item');
                    recommendationItem.innerHTML = `
                        <img src="${item.attributes.posterImage.small}" alt="${item.attributes.titles.en_jp}">
                        <h3>${item.attributes.titles.en_jp}</h3>
                        <p>${item.attributes.synopsis}</p>
                    `;
                    recommendationsContainer.appendChild(recommendationItem);
                });
            });
        });
    }
});

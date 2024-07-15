document.addEventListener('DOMContentLoaded', () => {
    fetchReleases('all');
});

function fetchReleases(type) {
    let endpoint = '';
    if (type === 'anime') {
        endpoint = 'https://kitsu.io/api/edge/anime?sort=-startDate';
    } else if (type === 'manga') {
        endpoint = 'https://kitsu.io/api/edge/manga?sort=-startDate';
    } else {
        // Fetch both anime and manga
        fetchReleases('anime');
        fetchReleases('manga');
        return;
    }

    fetch(endpoint)
        .then(response => response.json())
        .then(data => displayReleases(data.data, type))
        .catch(error => console.error('Erro ao buscar dados:', error));
}

function displayReleases(releases, type) {
    const container = document.getElementById('releases-container');
    if (type !== 'all') {
        container.innerHTML = ''; // Clear previous results
    }
    releases.forEach(release => {
        const item = document.createElement('div');
        item.classList.add('release-item');
        item.innerHTML = `
            <img src="${release.attributes.posterImage ? release.attributes.posterImage.small : 'default-image.jpg'}" alt="${release.attributes.titles.en_jp}">
            <h3>${release.attributes.titles.en_jp}</h3>
            <p>${release.attributes.synopsis ? release.attributes.synopsis.substring(0, 100) + '...' : 'Sinopse não disponível'}</p>
        `;
        container.appendChild(item);
    });
}

function searchReleases() {
    const query = document.getElementById('search-input').value;
    if (!query) return;

    const animeEndpoint = `https://kitsu.io/api/edge/anime?filter[text]=${query}`;
    const mangaEndpoint = `https://kitsu.io/api/edge/manga?filter[text]=${query}`;

    const fetchAnime = fetch(animeEndpoint).then(response => response.json());
    const fetchManga = fetch(mangaEndpoint).then(response => response.json());

    Promise.all([fetchAnime, fetchManga])
        .then(results => {
            const [animeResults, mangaResults] = results;
            const combinedResults = [...animeResults.data, ...mangaResults.data];
            displayReleases(combinedResults, 'all');
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
}

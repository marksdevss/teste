document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const searchType = document.getElementById('search-type').value;
    const searchInput = document.getElementById('search-input').value;
    searchMedia(searchInput, searchType);
});

let allResults = [];

function searchMedia(query, type) {
    fetch(`https://kitsu.io/api/edge/${type}?filter[text]=${query}`)
        .then(response => response.json())
        .then(data => {
            allResults = data.data;
            displayResults(allResults, type);
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
}

function displayResults(results, type) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';
    results.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.classList.add(type === 'anime' ? 'anime-card' : 'manga-card');
        const details = translateDetails(item.attributes, type);
        itemCard.innerHTML = `
            <img src="${details.posterImage}" alt="${details.title}">
            <h3>${details.title}</h3>
            <p>${details.synopsis}</p>
            <p><strong>Data de Início:</strong> ${details.startDate}</p>
            <p><strong>${type === 'anime' ? 'Episódios' : 'Capítulos'}:</strong> ${details.count}</p>
            <p><strong>Avaliação Média:</strong> ${details.averageRating}</p>
            <button onclick="openStatusPopup(${JSON.stringify(details)})">Adicionar à Biblioteca</button>
            <button onclick="openRatingPopup('${item.id}')">Avaliar</button>

        `;
        resultsContainer.appendChild(itemCard);
    });
}


function openRatingPopup(animeId) {
    currentAnimeId = animeId;
    document.getElementById('rating-popup').style.display = 'block';
}


function closeRatingPopup() {
    document.getElementById('rating-popup').style.display = 'none';
}

function addComment() {
    const commentInput = document.getElementById('comment-input');
    const ratingInput = document.getElementById('rating');
    const comment = commentInput.value;
    const rating = ratingInput.value;

    if (comment) {
        let comments = JSON.parse(localStorage.getItem(`comments-${currentAnimeId}`)) || [];
        comments.push({ text: comment, rating: rating });
        localStorage.setItem(`comments-${currentAnimeId}`, JSON.stringify(comments));
        commentInput.value = '';
        ratingInput.value = '1'; // Resetar a avaliação para 1
        closeRatingPopup();
        loadComments(currentAnimeId);
    }
}

function loadComments(animeId) {
    const comments = JSON.parse(localStorage.getItem(`comments-${animeId}`)) || [];
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '';
    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
            <p>${comment.text}</p>
            <span class="rating">Avaliação: ${comment.rating}</span>
        `;
        commentsList.appendChild(commentElement);
    });
}

function clearSearch() {
    document.getElementById('search-input').value = '';
    document.getElementById('results-container').innerHTML = '';
}


function translateDetails(attributes, type) {
    return {
        id: attributes.id,
        type: type,
        title: attributes.titles.en_jp || attributes.titles.ja_jp || attributes.titles.en,
        posterImage: attributes.posterImage ? attributes.posterImage.small : 'default-image-url', // Substitua 'default-image-url' por uma URL de imagem padrão, se necessário
        synopsis: attributes.synopsis || 'Sinopse não disponível',
        startDate: attributes.startDate ? new Date(attributes.startDate).toLocaleDateString('pt-BR') : 'Desconhecida',
        count: type === 'anime' ? attributes.episodeCount || 'Desconhecido' : attributes.chapterCount || 'Desconhecido',
        averageRating: attributes.averageRating || 'Não avaliado'
    };
}

function showComments(animeId) {
    currentAnimeId = animeId;
    loadComments(animeId);
}

function openStatusPopup(item) {
    selectedItem = item;
    document.getElementById('status-popup').style.display = 'block';
}

function closeStatusPopup() {
    document.getElementById('status-popup').style.display = 'none';
}

function saveToLibrary() {
    const status = document.getElementById('status-select').value;
    selectedItem.status = status;

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        const library = currentUser.library || [];
        library.push(selectedItem);
        currentUser.library = library;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }

    closeStatusPopup();
    alert('Adicionado à biblioteca com sucesso!');
}

function clearSearch() {
    document.getElementById('search-input').value = '';
    document.getElementById('results-container').innerHTML = '';
}

document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userInfo = document.getElementById('user-info');

    if (currentUser) {
        userInfo.innerHTML = `
            <img src="${currentUser.avatar}" alt="Avatar" style="width: 50px; height: 50px; border-radius: 50%; margin-left: 22px">
        `;
    } else {
        userInfo.innerHTML = '<p>Nenhum usuário logado.</p>';
    }
});


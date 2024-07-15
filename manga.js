document.addEventListener('DOMContentLoaded', () => {
    const mangasContainer = document.getElementById('mangas');
    const chaptersContainer = document.getElementById('chapters');
    const chapterContentContainer = document.getElementById('chapter-content');
    const mangaListSection = document.getElementById('manga-list');
    const chapterListSection = document.getElementById('chapter-list');
    const chapterReaderSection = document.getElementById('chapter-reader');
    const mangaTitleElement = document.getElementById('manga-title');
    const currentChapterTitleElement = document.getElementById('current-chapter-title');

    const apiUrl = 'https://kitsu.io/api/edge/manga';

    async function fetchMangas(query = '') {
        try {
            const response = await fetch(`${apiUrl}?filter[text]=${query}`);
            const data = await response.json();
            displayMangas(data.data);
        } catch (error) {
            console.error('Erro ao buscar mangás:', error);
        }
    }

    function displayMangas(mangas) {
        mangasContainer.innerHTML = '';
        mangas.forEach(manga => {
            const title = manga.attributes.titles.en || manga.attributes.titles.ja_jp || 'Título não disponível';
            const posterImage = manga.attributes.posterImage ? manga.attributes.posterImage.small : 'default-image-url';
            const mangaCard = document.createElement('div');
            mangaCard.classList.add('manga-card');
            mangaCard.innerHTML = `
                <img src="${posterImage}" alt="${title}">
                <h3>${title}</h3>
                <button onclick="showChapters('${manga.id}', '${title}')">Ver Capítulos</button>
            `;
            mangasContainer.appendChild(mangaCard);
        });
    }

    async function showChapters(mangaId, mangaTitle) {
        try {
            mangaTitleElement.textContent = mangaTitle;
            const response = await fetch(`https://kitsu.io/api/edge/manga/${mangaId}/chapters`);
            const data = await response.json();
            if (data.data && data.data.length > 0) {
                displayChapters(data.data);
            } else {
                displayNoChaptersMessage();
            }
        } catch (error) {
            console.error('Erro ao buscar capítulos:', error);
        }
    }

    function displayChapters(chapters) {
        chaptersContainer.innerHTML = '';
        chapters.forEach(chapter => {
            const title = chapter.attributes.titles.en || chapter.attributes.titles.ja_jp || 'Título não disponível';
            const chapterCard = document.createElement('div');
            chapterCard.classList.add('chapter-card');
            chapterCard.innerHTML = `
                <h3>${title}</h3>
                <button onclick="readChapter('${chapter.id}', '${title}')">Ler</button>
            `;
            chaptersContainer.appendChild(chapterCard);
        });
        mangaListSection.style.display = 'none';
        chapterListSection.style.display = 'block';
    }

    async function readChapter(chapterId, chapterTitle) {
        try {
            currentChapterTitleElement.textContent = chapterTitle;
            const response = await fetch(`https://kitsu.io/api/edge/chapters/${chapterId}`);
            const data = await response.json();
            const content = data.data.attributes.content || 'Conteúdo não disponível';
            chapterContentContainer.innerHTML = content;
            chapterListSection.style.display = 'none';
            chapterReaderSection.style.display = 'block';
        } catch (error) {
            console.error('Erro ao buscar capítulo:', error);
        }
    }

    function displayNoChaptersMessage() {
        chaptersContainer.innerHTML = '<p>Não há capítulos disponíveis para este mangá.</p>';
        mangaListSection.style.display = 'none';
        chapterListSection.style.display = 'block';
    }

    window.goBackToChapters = () => {
        chapterReaderSection.style.display = 'none';
        chapterListSection.style.display = 'block';
    }

    window.showChapters = showChapters;
    window.searchManga = searchManga;

    fetchMangas();
});

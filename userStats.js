document.addEventListener('DOMContentLoaded', () => {
    const totalAnimesElement = document.getElementById('total-animes');
    const totalMangasElement = document.getElementById('total-mangas');

    // Recuperar usuário logado do localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        // Recuperar a biblioteca do usuário logado
        const library = currentUser.library || { animes: [], mangas: [] };

        // Calcular total de animes e mangás
        const totalAnimes = library.animes.length;
        const totalMangas = library.mangas.length;

        // Atualizar elementos do DOM com estatísticas do usuário
        totalAnimesElement.textContent = totalAnimes;
        totalMangasElement.textContent = totalMangas;
    } else {
        // Se não houver usuário logado
        totalAnimesElement.textContent = '0';
        totalMangasElement.textContent = '0';
    }
});

// Exemplo de função para adicionar animes e mangás à biblioteca (chame isso ao adicionar um novo item)
function addToLibrary(type, item) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        const library = currentUser.library || { animes: [], mangas: [] };

        if (type === 'anime') {
            library.animes.push(item);
        } else if (type === 'manga') {
            library.mangas.push(item);
        }

        currentUser.library = library;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
}

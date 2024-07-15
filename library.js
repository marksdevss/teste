document.addEventListener('DOMContentLoaded', () => {
    const libraryContainer = document.getElementById('library-container');
    const filterType = document.getElementById('filter-type');
    filterType.addEventListener('change', loadLibrary);

    loadLibrary();

    function loadLibrary() {
        const library = JSON.parse(localStorage.getItem('library')) || [];
        const filter = filterType.value;
        libraryContainer.innerHTML = '';

        library
            .filter(item => filter === 'all' || item.type === filter)
            .forEach(displayLibraryItem);
    }

    function displayLibraryItem(item) {
        const itemElement = document.createElement('div');
        itemElement.classList.add('library-item');
        itemElement.innerHTML = `
            <img src="${item.posterImage}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p><strong>Data de Início:</strong> ${item.startDate}</p>
            <p><strong>${item.type === 'anime' ? 'Episódios' : 'Capítulos'}:</strong> ${item.count}</p>
            <p><strong>Avaliação Média:</strong> ${item.averageRating}</p>
        `;
        libraryContainer.appendChild(itemElement);
    }
});

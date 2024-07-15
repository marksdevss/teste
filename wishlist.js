document.addEventListener('DOMContentLoaded', () => {
    const wishlistContainer = document.getElementById('wishlist-container');
    loadWishlist();

    function loadWishlist() {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlist.forEach(displayWishlistItem);
    }

    function displayWishlistItem(item) {
        const itemElement = document.createElement('div');
        itemElement.classList.add('wishlist-item');
        itemElement.innerHTML = `
            <img src="${item.posterImage}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p><strong>Data de Início:</strong> ${item.startDate}</p>
            <p><strong>${item.type === 'anime' ? 'Episódios' : 'Capítulos'}:</strong> ${item.count}</p>
            <p><strong>Avaliação Média:</strong> ${item.averageRating}</p>
        `;
        wishlistContainer.appendChild(itemElement);
    }
});

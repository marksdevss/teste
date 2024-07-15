const products = [
    {
        id: 1,
        name: 'Action Figure Naruto',
        price: 49.99,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZfUv5sJYim9RWP4oiHZ89LMAhayrbsiDTbg&s'
    },
    {
        id: 2,
        name: 'Caneca One Piece',
        price: 19.99,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf11fkYd-MCTzlH_ocQ6_gCY3O33IlnKMdKA&s'
    },
    {
        id: 3,
        name: 'Camiseta Attack on Titan',
        price: 29.99,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-z9yl9YW7Y6dNqfVH93Sux8103z4U1qFwLA&s'
    },
    {
        id: 4,
        name: 'Manga Death Note Vol. 1',
        price: 14.99,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq1VQBi4eza83aWxfsgvMgd62cvsustfhx-Q&s'
    },
    ,
    {
        id: 5,
        name: 'Chaveiro My Hero Academia',
        price: 9.99,
        image: 'https://ae01.alicdn.com/kf/HTB1VpsjR4jaK1RjSZFAq6zdLFXa4.jpg_640x640Q90.jpg_.webp'
    },
    {
        id: 6,
        name: 'Poster Demon Slayer',
        price: 12.99,
        image: 'https://images-americanas.b2w.io/produtos/3547992883/imagens/quadro-decorativo-poster-demon-slayer-capa-anime-arte-para-sala-quarto/3547992841_1_large.jpg'
    },
    {
        id: 7,
        name: 'Almofada Tokyo Ghoul',
        price: 24.99,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqGeOw9B7DebjCmk-4pRzJXnW8POfZqny2fw&s'
    },
    {
        id: 8,
        name: 'Cosplay Sword Art Online',
        price: 89.99,
        image: 'https://m.media-amazon.com/images/I/718Kt3aV7VL._AC_SL1200_.jpg'
    },
    {
        id: 9,
        name: 'Boneco One Punch Man',
        price: 39.99,
        image: 'https://m.media-amazon.com/images/I/41zDxmXx4YL._AC_UF894,1000_QL80_.jpg'
    },
    {
        id: 10,
        name: 'Livro Fairy Tail',
        price: 17.99,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh1KfGW2tjdDLyN_4uMCSNONbeCaW7dKkBJQ&s'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Preço: R$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
        `;
        productsContainer.appendChild(productItem);
    });
});

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} foi adicionado ao carrinho!`);
}

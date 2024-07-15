document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-container');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length > 0) {
        cart.forEach(product => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('product-item');
            cartItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Preço: R$${product.price.toFixed(2)}</p>
            `;
            cartContainer.appendChild(cartItem);
        });

        const total = cart.reduce((sum, product) => sum + product.price, 0);
        const totalElement = document.createElement('div');
        totalElement.classList.add('product-item');
        totalElement.innerHTML = `<h3>Total: R$${total.toFixed(2)}</h3>`;
        cartContainer.appendChild(totalElement);
    } else {
        cartContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
    }
});

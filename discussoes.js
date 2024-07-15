document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const feed = document.getElementById('feed');
    const trendingTopics = document.getElementById('trendingTopics');

    // Carrega posts e tópicos ao carregar a página
    loadPosts();
    loadTrendingTopics();

    postForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const category = document.getElementById('category').value;
        const content = document.getElementById('content').value;
        const fileInput = document.getElementById('file-input');

        const reader = new FileReader();
        reader.onload = function() {
            const image = reader.result;
            savePost(title, category, content, image);
            postForm.reset();
        };

        if (fileInput.files[0]) {
            reader.readAsDataURL(fileInput.files[0]);
        } else {
            savePost(title, category, content, null);
        }
    });

    function savePost(title, category, content, image) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const post = { title, category, content, image, timestamp: new Date().toISOString() };
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
        displayPost(post);
        updateTrendingTopics(category);
    }

    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.forEach(displayPost);
    }

    function displayPost(post) {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>Category: ${post.category}</p>
            <p>${post.content}</p>
            ${post.image ? `<img src="${post.image}" alt="Post image">` : ''}
            <p><small>${new Date(post.timestamp).toLocaleString()}</small></p>
        `;
        feed.prepend(postElement);
    }

    function loadTrendingTopics() {
        const trending = JSON.parse(localStorage.getItem('trending')) || [];
        trending.forEach(displayTrendingTopic);
    }

    function displayTrendingTopic(topic) {
        const topicElement = document.createElement('p');
        topicElement.textContent = topic;
        trendingTopics.appendChild(topicElement);
    }

    function updateTrendingTopics(category) {
        let trending = JSON.parse(localStorage.getItem('trending')) || [];
        trending.push(category);

        const topicCounts = trending.reduce((acc, topic) => {
            acc[topic] = (acc[topic] || 0) + 1;
            return acc;
        }, {});

        trending = Object.keys(topicCounts)
            .sort((a, b) => topicCounts[b] - topicCounts[a])
            .slice(0, 5);

        localStorage.setItem('trending', JSON.stringify(trending));
        trendingTopics.innerHTML = '';
        trending.forEach(displayTrendingTopic);
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-body');
    const closeButton = document.querySelector('.close-button');

    const pages = {
        explore: '<h2>Explore</h2><p>Conteúdo da página Explore...</p>',
        notifications: '<h2>Notificações</h2><p>Conteúdo da página de Notificações...</p>',
        messages: '<h2>Mensagens</h2><p>Conteúdo da página de Mensagens...</p>',
        profile: '<h2>Perfil</h2><p>Conteúdo da página de Perfil...</p>',
        settings: '<h2>Configurações</h2><p>Conteúdo da página de Configurações...</p>',
    };

    function openModal(page) {
        modalContent.innerHTML = pages[page];
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    document.getElementById('explore').addEventListener('click', () => openModal('explore'));
    document.getElementById('notifications').addEventListener('click', () => openModal('notifications'));
    document.getElementById('messages').addEventListener('click', () => openModal('messages'));
    document.getElementById('profile').addEventListener('click', () => openModal('profile'));
    document.getElementById('settings').addEventListener('click', () => openModal('settings'));

    closeButton.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
});

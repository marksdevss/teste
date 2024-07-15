document.addEventListener('DOMContentLoaded', () => {
    const exploreContainer = document.getElementById('explore-container');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const content = document.querySelector('.content');

    loadExplorePosts();

    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        content.classList.toggle('shifted');
    });

    function loadExplorePosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.forEach(displayExplorePost);
    }

    function displayExplorePost(post) {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>Category: ${post.category}</p>
            <p>${post.content}</p>
            ${post.image ? `<img src="${post.image}" alt="Post image">` : ''}
            <p><small>${new Date(post.timestamp).toLocaleString()}</small></p>
        `;
        exploreContainer.appendChild(postElement);
    }
});

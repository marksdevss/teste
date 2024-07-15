document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('upload-form');
    const gallery = document.getElementById('gallery');

    let fanArtGallery = JSON.parse(localStorage.getItem('fanArtGallery')) || [];

    function displayGallery() {
        gallery.innerHTML = '';
        fanArtGallery.forEach((art, index) => {
            const artCard = document.createElement('div');
            artCard.classList.add('art-card');
            artCard.innerHTML = `
                <img src="${art.image}" alt="${art.title}">
                <h3>${art.title}</h3>
                <p>${art.description}</p>
            `;
            gallery.appendChild(artCard);
        });
    }

    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('art-title').value;
        const description = document.getElementById('art-description').value;
        const file = document.getElementById('art-file').files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const newArt = {
                    title: title,
                    description: description,
                    image: event.target.result
                };
                fanArtGallery.push(newArt);
                localStorage.setItem('fanArtGallery', JSON.stringify(fanArtGallery));
                displayGallery();
            };
            reader.readAsDataURL(file);
        }

        uploadForm.reset();
    });

    displayGallery();
});

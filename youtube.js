// youtube.js
async function searchAnime() {
    const query = document.getElementById('search-input').value;
    const apiKey = 'AIzaSyCnxiQTS7SC0GA88FXwLUc1YciDVfBGUU0';
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${apiKey}`);
    const data = await response.json();
    displayResults(data.items);
}

function displayResults(videos) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';
    videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.classList.add('video');
        videoElement.innerHTML = `
            <h3>${video.snippet.title}</h3>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allowfullscreen></iframe>
        `;
        resultsContainer.appendChild(videoElement);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadReleaseCalendar();

    let currentIndex = 0;

    function loadReleaseCalendar() {
        // Aqui, usamos a API Kitsu para buscar lançamentos
        fetch('https://kitsu.io/api/edge/anime?sort=-startDate&page[limit]=10')
            .then(response => response.json())
            .then(data => {
                const calendarContainer = document.getElementById('calendar-container');
                const sliderWrapper = document.createElement('div');
                sliderWrapper.classList.add('slider-wrapper');
                data.data.forEach(item => {
                    const releaseItem = document.createElement('div');
                    releaseItem.classList.add('release-item');
                    releaseItem.innerHTML = `
                        <img src="${item.attributes.posterImage.small}" alt="${item.attributes.titles.en_jp}">
                        <h3>${item.attributes.titles.en_jp}</h3>
                        <p class="date">Lançamento: ${new Date(item.attributes.startDate).toLocaleDateString('pt-BR')}</p>
                    `;
                    sliderWrapper.appendChild(releaseItem);
                });
                calendarContainer.appendChild(sliderWrapper);
                addSliderControls();
            })
            .catch(error => {
                console.error('Erro ao buscar dados de lançamentos:', error);
            });
    }

    function addSliderControls() {
        const calendarContainer = document.getElementById('calendar-container');
        const prevButton = document.createElement('button');
        prevButton.classList.add('slider-button', 'prev');
        prevButton.innerHTML = '&#10094;'; // Left arrow
        prevButton.addEventListener('click', () => slide(-1));
        calendarContainer.appendChild(prevButton);

        const nextButton = document.createElement('button');
        nextButton.classList.add('slider-button', 'next');
        nextButton.innerHTML = '&#10095;'; // Right arrow
        nextButton.addEventListener('click', () => slide(1));
        calendarContainer.appendChild(nextButton);
    }

    function slide(direction) {
        const sliderWrapper = document.querySelector('.slider-wrapper');
        const items = document.querySelectorAll('.release-item');
        const itemWidth = items[0].offsetWidth + 20; // 20px margin
        const maxIndex = items.length - Math.floor(sliderWrapper.offsetWidth / itemWidth);
        currentIndex = Math.min(Math.max(currentIndex + direction, 0), maxIndex);
        sliderWrapper.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
});

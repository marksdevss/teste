document.addEventListener('DOMContentLoaded', () => {
    const messagesContainer = document.getElementById('messages');
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    const fileInput = document.getElementById('file-input');

    // Carregar mensagens do LocalStorage
    let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    displayMessages();

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const text = messageInput.value;
        const file = fileInput.files[0];

        if (text || file) {
            const message = { text, file: null };

            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    message.file = { name: file.name, data: event.target.result, type: file.type };
                    messages.push(message);
                    localStorage.setItem('chatMessages', JSON.stringify(messages));
                    displayMessages();
                };
                reader.readAsDataURL(file);
            } else {
                messages.push(message);
                localStorage.setItem('chatMessages', JSON.stringify(messages));
                displayMessages();
            }

            messageInput.value = '';
            fileInput.value = '';
        }
    });

    function displayMessages() {
        messagesContainer.innerHTML = '';
        messages.forEach((message) => {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');

            if (message.text) {
                const textElement = document.createElement('p');
                textElement.textContent = message.text;
                messageElement.appendChild(textElement);
            }

            if (message.file) {
                let mediaElement;
                if (message.file.type.startsWith('image/')) {
                    mediaElement = document.createElement('img');
                    mediaElement.src = message.file.data;
                } else if (message.file.type.startsWith('video/')) {
                    mediaElement = document.createElement('video');
                    mediaElement.src = message.file.data;
                    mediaElement.controls = true;
                } else if (message.file.type.startsWith('audio/')) {
                    mediaElement = document.createElement('audio');
                    mediaElement.src = message.file.data;
                    mediaElement.controls = true;
                }
                if (mediaElement) {
                    messageElement.appendChild(mediaElement);
                }
            }

            messagesContainer.appendChild(messageElement);
        });
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
});

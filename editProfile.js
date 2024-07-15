document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        document.getElementById('avatarPreview').src = currentUser.avatar;
        document.getElementById('username').value = currentUser.username;
        document.getElementById('email').value = currentUser.email || '';
        document.getElementById('fullName').value = currentUser.fullName || '';
    }

    document.getElementById('editProfileForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const avatarInput = document.getElementById('avatar');
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        const fullName = document.getElementById('fullName').value;

        const reader = new FileReader();
        reader.onload = function() {
            const updatedUser = {
                ...currentUser,
                username,
                password: password || currentUser.password,
                email,
                fullName,
                avatar: avatarInput.files[0] ? reader.result : currentUser.avatar
            };

            localStorage.setItem('currentUser', JSON.stringify(updatedUser));

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userIndex = users.findIndex(user => user.username === currentUser.username);
            if (userIndex > -1) {
                users[userIndex] = updatedUser;
                localStorage.setItem('users', JSON.stringify(users));
            }

            alert('Perfil atualizado com sucesso!');
            window.location.href = 'ANIME-LISTS.html';
        };

        if (avatarInput.files[0]) {
            reader.readAsDataURL(avatarInput.files[0]);
        } else {
            reader.onload();
        }
    });
});

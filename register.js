document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const avatar = document.getElementById('avatar').files[0];
    const verified = document.getElementById('verified').checked;

    const reader = new FileReader();
    reader.onload = function() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.username === username);

        if (!userExists) {
            users.push({ username, password, avatar: reader.result, verified });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registro bem-sucedido! Faça login agora.');
            window.location.href = 'loginOtk.html';
        } else {
            alert('Nome de usuário já existe. Tente outro.');
        }
    };

    reader.readAsDataURL(avatar);
});

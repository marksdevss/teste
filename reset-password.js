document.getElementById('reset-password-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (newPassword !== confirmPassword) {
        alert('As senhas não coincidem.');
        return;
    }

    const storedToken = JSON.parse(localStorage.getItem('passwordResetToken'));

    if (storedToken && storedToken.token === token) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(user => user.email === storedToken.email);

        if (userIndex !== -1) {
            users[userIndex].password = newPassword;
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.removeItem('passwordResetToken');
            alert('Senha redefinida com sucesso.');
            window.location.href = 'LoginOtk.html';
        } else {
            alert('Usuário não encontrado.');
        }
    } else {
        alert('Token inválido ou expirado.');
    }
});

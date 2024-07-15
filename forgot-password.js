document.getElementById('forgot-password-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;

    // Gerar token de recuperação
    const token = Math.random().toString(36).substr(2);
    localStorage.setItem('passwordResetToken', JSON.stringify({ email, token }));

    alert('Um link de recuperação foi enviado para o seu email (simulado). Use o seguinte link para redefinir sua senha:');
    console.log(`http://localhost:3000/reset-password.html?token=${token}`);
});

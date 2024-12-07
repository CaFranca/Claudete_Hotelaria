function logout() {
    localStorage.removeItem('logado');  // Remove a chave 'logado'
    window.location.href = 'loginbucha.html'; // Redireciona para a página de login
}

function verificaLogin() {
    var logado = localStorage.getItem('logado');
    if (logado === 'true') {
        // O usuário está logado, podemos permitir acesso à página
        console.log("Usuário está logado.");
    } else {
        // O usuário não está logado, redirecionar para a página de login
        window.location.href = 'loginbucha.html';
    }
}

// Chama a função de verificação quando a página for carregada
window.onload = verificaLogin;



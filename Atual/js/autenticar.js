// Função para realizar o logout do usuário
function logout() {
    localStorage.removeItem('logado'); // Remove a chave 'logado' do localStorage para indicar que o usuário não está mais logado
    window.location.href = 'login.html'; // Redireciona o usuário para a página de login
}

// Função para verificar se o usuário está logado
function verificaLogin() {
    var logado = localStorage.getItem('logado'); // Recupera o valor da chave 'logado' do localStorage

    if (logado === 'true') { 
        // Se o valor da chave 'logado' for igual a 'true', o usuário está autenticado
        console.log("Usuário está logado."); // Exibe uma mensagem no console para fins de depuração
    } else {
        // Se o valor da chave 'logado' for diferente de 'true', o usuário não está autenticado
        window.location.href = 'login.html'; // Redireciona o usuário para a página de login
    }
}

// Configura a função para ser executada quando a página for carregada
window.onload = verificaLogin; // Chama a função verificaLogin automaticamente ao carregar a página

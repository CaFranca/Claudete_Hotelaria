// const senhaCriptografada = CryptoJS.SHA256(senha).toString(CryptoJS.enc.Base64);
// Variável para armazenar registros de log de eventos, recuperados do localStorage
let logging = JSON.parse(localStorage.getItem('logging')) || [];

// Função assíncrona para criptografar uma mensagem utilizando SHA-256
async function criptografar(message) {
    // Codifica a mensagem para um formato ArrayBuffer
    const msgBuffer = new TextEncoder().encode(message);

    // Cria um hash da mensagem utilizando o algoritmo SHA-256
    const hash = await window.crypto.subtle.digest('SHA-256', msgBuffer);

    // Converte o hash em um array de bytes e, em seguida, em uma string hexadecimal
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Retorna o hash hexadecimal
    return hashHex;
}

// Função de login assíncrona que verifica as credenciais do usuário
async function login(event) {
    event.preventDefault(); // Impede o envio automático do formulário ao clicar no botão de login

    // Obtém o nome de usuário e a senha fornecidos pelo usuário
    var usuario = document.getElementsByName('username')[0].value.toLowerCase();
    var senha = await criptografar(document.getElementsByName('password')[0].value);  

    // Debug: Exibe a senha criptografada no console para verificação
    console.log(`Essa é a senha: ${senha}`);

    // Verifica se as credenciais fornecidas correspondem às credenciais esperadas
    if (usuario == "admin" && (senha == await criptografar("admin"))) {
        console.log("True"); // Indica que o login foi bem-sucedido no console

        // Registra que o usuário está logado e registra o evento no localStorage
        localStorage.setItem('logado', 'true');
        localStorage.setItem('logging', JSON.stringify(`Login de admin às ${new Date()}`));

        // Redireciona o usuário para a página principal
        window.location.href = 'index.html';
    } else {
        // Alerta o usuário de que os dados fornecidos estão incorretos
        alert("Dados incorretos, tente novamente");
    }
}

// Função para alternar a visibilidade do campo de senha
function toggleSenha() {
    var senhaInput = document.getElementById("txtSenha"); // Referência ao campo de entrada da senha
    var olhoIcon = document.getElementById("toggleSenha").getElementsByTagName('i')[0]; // Referência ao ícone do botão de alternância

    // Verifica se a senha está atualmente oculta
    if (senhaInput.type === "password") {
        senhaInput.type = "text"; // Exibe a senha
        olhoIcon.classList.remove("fa-eye"); // Remove o ícone de olho aberto
        olhoIcon.classList.add("fa-eye-slash"); // Adiciona o ícone de olho fechado
    } else {
        senhaInput.type = "password"; // Oculta a senha novamente
        olhoIcon.classList.remove("fa-eye-slash"); // Remove o ícone de olho fechado
        olhoIcon.classList.add("fa-eye"); // Adiciona o ícone de olho aberto
    }
}

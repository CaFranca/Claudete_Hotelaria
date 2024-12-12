function Login(event) {
    event.preventDefault() // impede que o formulário seja enviado assim que o usuário aperte o botão (isso fazia com que a validação não ocorresse)
    var usuario = document.getElementsByName('username')[0].value.toLowerCase();
    var senha = document.getElementsByName('password')[0].value.toLowerCase();
    if (usuario == "admin" && senha == "admin") {
        localStorage.setItem('logado', 'true');
        window.location.href = 'index.html';
    } else {
        alert("Dados incorretos, tente novamente");
    }
}

// Função para alternar entre mostrar/esconder a senha
function toggleSenha() {
    var senhaInput = document.getElementById("txtSenha");
    var olhoIcon = document.getElementById("toggleSenha").getElementsByTagName('i')[0];

    // Verifica se a senha está visível ou não
    if (senhaInput.type === "password") {
        senhaInput.type = "text"; // Mostra a senha
        olhoIcon.classList.remove("fa-eye"); // Remove o ícone de olho aberto
        olhoIcon.classList.add("fa-eye-slash"); // Adiciona o ícone de olho fechado
    } else {
        senhaInput.type = "password"; // Esconde a senha
        olhoIcon.classList.remove("fa-eye-slash"); // Remove o ícone de olho fechado
        olhoIcon.classList.add("fa-eye"); // Adiciona o ícone de olho aberto
    }
}


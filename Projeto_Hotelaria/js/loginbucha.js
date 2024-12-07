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
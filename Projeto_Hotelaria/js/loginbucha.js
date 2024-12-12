//const senhaCriptografada = CryptoJS.SHA256(senha).toString(CryptoJS.enc.Base64);

async function criptografar(message) {
    // Codifica a mensagem para um ArrayBuffer
    const msgBuffer = new TextEncoder().encode(message);
  
    // Cria um objeto de hash SHA-256
    const hash = await window.crypto.subtle.digest('SHA-256', msgBuffer);
  
    // Converte o resultado do hash em uma string hexadecimal
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
    return hashHex;
  }

async function login(event) {
    event.preventDefault() // impede que o formulário seja enviado assim que o usuário aperte o botão (isso fazia com que a validação não ocorresse)
    var usuario = document.getElementsByName('username')[0].value.toLowerCase();
    var senha = await criptografar(document.getElementsByName('password')[0].value);  
    console.log(`Essa é a senha: ${senha}`)
    if (usuario == "admin" && ( senha == await criptografar("admin"))) {
        console.log("True")
        localStorage.setItem('logado', 'true');
        window.location.href = 'index.html';
    } else {
        alert("Dados incorretos, tente novamente");
    }
}
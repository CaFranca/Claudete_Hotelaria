// Recupera a lista de hóspedes do localStorage ou inicializa como um array vazio
let hospedes = JSON.parse(localStorage.getItem('hospedes')) || [];

// Adiciona um ouvinte de evento para o formulário de cadastro
document.getElementById('form-hospedes').addEventListener('submit', (event) => {
    event.preventDefault(); // Previne a recarga da página

    // Obtém os valores dos campos do formulário
    const nome = document.getElementById('nome').value.trim(); // Remove espaços em branco
    const documento = document.getElementById('documento').value.trim();
    const endereco = document.getElementById('endereco').value.trim();
    const contato = document.getElementById('contato').value.trim();

    // Verifica se os campos estão preenchidos
    if (!nome || !documento || !endereco || !contato) {
        document.getElementById('mensagem-hospede').innerText = 'Por favor, preencha todos os campos.';
        return; // Para a execução se algum campo estiver vazio
    }

    // Procura se o hóspede já existe pelo documento
    const hospedeIndex = hospedes.findIndex(h => h.documento === documento);

    if (hospedeIndex >= 0) {
        // Atualiza as informações do hóspede existente
        hospedes[hospedeIndex] = { nome, documento, endereco, contato };
        document.getElementById('mensagem-hospede').innerText = 'Informações do hóspede atualizadas.';
    } else {
        // Adiciona um novo hóspede
        hospedes.push({ nome, documento, endereco, contato });
        document.getElementById('mensagem-hospede').innerText = 'Hóspede cadastrado com sucesso.';
    }

    // Salva a lista de hóspedes no localStorage
    localStorage.setItem('hospedes', JSON.stringify(hospedes));

    // Limpa os campos do formulário após o envio
    document.getElementById('form-hospedes').reset();
});

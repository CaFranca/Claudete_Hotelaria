// Recupera os dados de hóspedes e frigobar do localStorage ou inicializa como arrays vazios caso não existam
var hospedes = JSON.parse(localStorage.getItem('hospedes')) || []; // Carrega os hóspedes previamente cadastrados
let frigobar = JSON.parse(localStorage.getItem('frigobar')) || []; // Carrega o estado atual do frigobar
const mensagemHospede = document.getElementById('mensagem-hospede'); // Elemento para exibir mensagens ao usuário

// Função para validar os dados inseridos no formulário
function validarDados(nome, documento, endereco, contato) {
    // Verifica se todos os campos possuem valores válidos (não estão vazios)
    return nome && documento && endereco && contato;
}

// Função para adicionar um novo hóspede
function adicionarHospede(nome, documento, endereco, contato) {
    // Adiciona o novo hóspede ao array 'hospedes'
    hospedes.push({ nome, documento, endereco, contato }); // Cria um objeto com as informações do hóspede e adiciona ao array
    localStorage.setItem('hospedes', JSON.stringify(hospedes)); // Atualiza o localStorage com o novo array de hóspedes

    // Registra o evento no localStorage para fins de auditoria
    localStorage.setItem(
        'logging',
        JSON.stringify(`Hóspede ${nome} criado às ${new Date().toLocaleString()}`) // Salva a data e hora da criação
    );

    // Atualiza a mensagem para informar que o cadastro foi bem-sucedido
    mensagemHospede.innerText = 'Hóspede cadastrado com sucesso.';
}

// Adiciona um ouvinte de eventos ao formulário de cadastro
document.getElementById('form-cadastro-hospedes').addEventListener('submit', (event) => {
    event.preventDefault(); // Impede que a página recarregue ao enviar o formulário

    // Captura os valores dos campos do formulário
    const nome = document.getElementById('nome').value.trim(); // Remove espaços extras antes e depois do valor
    const documento = document.getElementById('documento').value.trim();
    const endereco = document.getElementById('endereco').value.trim();
    const contato = document.getElementById('contato').value.trim();

    // Verifica se todos os campos foram preenchidos
    if (!validarDados(nome, documento, endereco, contato)) {
        // Exibe uma mensagem de erro caso algum campo esteja vazio
        mensagemHospede.innerText = 'Por favor, preencha todos os campos.';
        return; // Encerra a execução da função
    }

    // Chama a função para adicionar o hóspede
    adicionarHospede(nome, documento, endereco, contato);

    // Limpa os campos do formulário após o cadastro
    document.getElementById('form-cadastro-hospedes').reset(); // Reseta o formulário, limpando os campos
});

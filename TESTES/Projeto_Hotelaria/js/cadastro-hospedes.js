var hospedes = JSON.parse(localStorage.getItem('hospedes')) || []; //Pega os hóspedes do localStorage
let frigobar = JSON.parse(localStorage.getItem('frigobar')) || [];


function validarDados(nome, documento, endereco, contato) { //Verifica se todos os campos estão preenchidos. 
    return nome && documento && endereco && contato; //No caso, se um campo estiver vazio, a função retornará "False".
}

function adicionarHospede(nome, documento, endereco, contato) { //Adiciona um novo hóspede ao localStorage
    hospedes.push({ nome, documento, endereco, contato }); //Envia o hóspede para o final do array hospedes, inicializado na primeira linha
    localStorage.setItem('hospedes', JSON.stringify(hospedes)); //Manda o array para o localStorage
    return 'Hóspede cadastrado com sucesso.';
}


// Evento de envio do formulário de cadastro
document.getElementById('form-cadastro-hospedes').addEventListener('submit', (event) => {
    event.preventDefault(); // Previne a recarga da página

    // Obtém os valores dos campos do formulário
    const nome = document.getElementById('nome').value.trim();
    const documento = document.getElementById('documento').value.trim();
    const endereco = document.getElementById('endereco').value.trim();
    const contato = document.getElementById('contato').value.trim();

    // Verifica se os dados são válidos
    if (!validarDados(nome, documento, endereco, contato)) {
        document.getElementById('mensagem-hospede').innerText = 
            'Por favor, preencha todos os campos.';
        return;
    }

    // Adiciona o hóspede
    const mensagem = adicionarHospede(nome, documento, endereco, contato);
    document.getElementById('mensagem-hospede').innerText = mensagem;

    // Limpa os campos do formulário após o envio
    document.getElementById('form-cadastro-hospedes').reset();
});

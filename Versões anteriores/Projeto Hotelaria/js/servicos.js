// Recupera os hóspedes, reservas e serviços do localStorage
let hospedes = JSON.parse(localStorage.getItem('hospedes')) || [];
let reservasExistentes = JSON.parse(localStorage.getItem('reservas')) || [];
let itensFrigobar = {}; // Objeto para controlar os itens do frigobar e suas quantidades

// Preenche a lista de hóspedes no select
const hospedeSelect = document.getElementById('hospede-servico');
hospedes.forEach(hospede => {
    const option = document.createElement('option');
    option.value = hospede.documento; // Usa o documento como valor
    option.textContent = hospede.nome;
    hospedeSelect.appendChild(option);
});

// Função para filtrar os quartos com base no hóspede selecionado
function filtrarQuartosPorHospede() {
    const hospedeDocumento = hospedeSelect.value;

    // Limpa o select de quartos
    const quartoSelect = document.getElementById('numero-quarto-servico');
    quartoSelect.innerHTML = ''; // Limpa as opções atuais

    // Filtra os quartos com base no hóspede
    const reservasDoHospede = reservasExistentes.filter(reserva => reserva.documentoHospede === hospedeDocumento);

    if (reservasDoHospede.length > 0) {
        reservasDoHospede.forEach(reserva => {
            const option = document.createElement('option');
            option.value = reserva.numeroQuarto;
            option.textContent = `Quarto ${reserva.numeroQuarto} - ${reserva.tipoQuarto}`;
            quartoSelect.appendChild(option);
        });

        // Exibe o nome do hóspede próximo ao quarto selecionado
        const nomeHospede = hospedes.find(hospede => hospede.documento === hospedeDocumento).nome;
        document.getElementById('nome-hospede-quarto').textContent = `Hóspede: ${nomeHospede}`;
    } else {
        document.getElementById('nome-hospede-quarto').textContent = 'Nenhum quarto encontrado para este hóspede.';
    }
}

// Preenche os quartos quando o hóspede é selecionado
hospedeSelect.addEventListener('change', filtrarQuartosPorHospede);

// Função para adicionar itens do frigobar
document.getElementById('add-frigobar').addEventListener('click', () => {
    const itemSelecionado = document.getElementById('frigobar').value;
    const itemPreco = document.getElementById('frigobar').options[document.getElementById('frigobar').selectedIndex].text.split(' (R$ ')[1].split(')')[0];

    // Verifica se o item foi selecionado (não pode ser vazio ou "Nenhum")
    if (!itemSelecionado || itemSelecionado === "Nenhum") {
        alert('Por favor, selecione um item do frigobar.');
        return;
    }

    // Verifica se o item já foi adicionado
    if (itensFrigobar[itemSelecionado]) {
        itensFrigobar[itemSelecionado].quantidade += 1; // Incrementa a quantidade
    } else {
        itensFrigobar[itemSelecionado] = {
            nome: itemSelecionado,
            preco: parseFloat(itemPreco),
            quantidade: 1
        };
    }

    // Atualiza a lista de itens do frigobar
    atualizarListaFrigobar();
});

// Função para atualizar a lista de itens do frigobar na tela
function atualizarListaFrigobar() {
    const listaFrigobar = document.getElementById('itens-frigobar');
    listaFrigobar.innerHTML = ''; // Limpa a lista atual

    for (let item in itensFrigobar) {
        const li = document.createElement('li');
        li.textContent = `${itensFrigobar[item].nome} - Quantidade: ${itensFrigobar[item].quantidade}`;
        listaFrigobar.appendChild(li);
    }
}

// Função para processar o envio do formulário
document.getElementById('form-servicos').addEventListener('submit', (event) => {
    event.preventDefault();

    const hospedeDocumento = hospedeSelect.value;
    const numeroQuarto = document.getElementById('numero-quarto-servico').value;
    const servicoSelecionado = document.getElementById('servico').value;

    // Valida se todos os campos estão preenchidos corretamente
    if (!hospedeDocumento || !numeroQuarto || !servicoSelecionado || servicoSelecionado === "Nenhum") {
        alert('Por favor, preencha todos os campos necessários e escolha pelo menos um serviço.');
        return;
    }

    // Cálculo do valor do serviço selecionado
    let valorServico = 0;
    switch (servicoSelecionado) {
        case 'restaurante':
            valorServico = 30;
            break;
        case 'lavanderia':
            valorServico = 20;
            break;
        case 'wi-fi':
            valorServico = 15;
            break;
        case 'wi-fi5g':
            valorServico = 25;
            break;
        case 'servico-quarto':
            valorServico = 40;
            break;
        case 'limpeza':
            valorServico = 30;
            break;
        case 'translado':
            valorServico = 50;
            break;
        case 'outros':
            valorServico = 10;
            break;
        default:
            break;
    }

    // Adiciona os itens do frigobar ao valor do serviço
    for (let item in itensFrigobar) {
        valorServico += itensFrigobar[item].preco * itensFrigobar[item].quantidade;
    }

    // Encontra a reserva do hóspede com o número do quarto
    const reserva = reservasExistentes.find(r => r.documentoHospede === hospedeDocumento && r.numeroQuarto === numeroQuarto);
    if (!reserva) {
        alert('Reserva não encontrada para este hóspede e quarto');
        return;
    }

    // Adiciona o valor do serviço ao preço da estadia
    reserva.precoEstadia += valorServico;

    // Atualiza o localStorage com a nova reserva
    localStorage.setItem('reservas', JSON.stringify(reservasExistentes));

    // Exibe a mensagem de confirmação
    document.getElementById('mensagem-servico').innerText = `Serviço ${servicoSelecionado} e frigobar solicitado para o hóspede no Quarto ${numeroQuarto}. Valor adicionado: R$ ${valorServico.toFixed(2)}.`; 

    // Limpa o formulário após submissão
    document.getElementById('form-servicos').reset();
    document.getElementById('nome-hospede-quarto').textContent = ''; // Limpa o nome do hóspede
    itensFrigobar = {}; // Limpa os itens do frigobar
    atualizarListaFrigobar(); // Atualiza a lista de itens do frigobar
});

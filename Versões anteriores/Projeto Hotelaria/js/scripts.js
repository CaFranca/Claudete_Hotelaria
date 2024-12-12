let hospedes = JSON.parse(localStorage.getItem('hospedes')) || [];
let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
let alugueis = JSON.parse(localStorage.getItem('alugueis')) || [];
let servicos = JSON.parse(localStorage.getItem('servicos')) || [];
let consumosFrigobar = JSON.parse(localStorage.getItem('consumosFrigobar')) || [];
let contas = JSON.parse(localStorage.getItem('contas')) || [];

// Função para salvar ou atualizar dados de hóspedes
document.getElementById('form-hospedes').addEventListener('submit', (event) => {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const documento = document.getElementById('documento').value;
    const endereco = document.getElementById('endereco').value;
    const contato = document.getElementById('contato').value;

    const hospedeIndex = hospedes.findIndex(h => h.documento === documento);

    if (hospedeIndex >= 0) {
        hospedes[hospedeIndex] = { nome, documento, endereco, contato };
        document.getElementById('mensagem-hospede').innerText = 'Informações do hóspede atualizadas.';
    } else {
        hospedes.push({ nome, documento, endereco, contato });
        document.getElementById('mensagem-hospede').innerText = 'Hóspede cadastrado com sucesso.';
    }

    localStorage.setItem('hospedes', JSON.stringify(hospedes));
});

// Função para salvar reservas
document.getElementById('form-reservas').addEventListener('submit', (event) => {
    event.preventDefault();
    const dataCheckin = new Date(document.getElementById('data-checkin').value);
    const dataCheckout = new Date(document.getElementById('data-checkout').value);
    const hospedeNome = document.getElementById('hospede-reserva').value;
    const quartoNumero = document.getElementById('quarto-reserva').value;
    const precoDiaria = parseFloat(document.getElementById('preco-diaria').value);

    const diffTime = Math.abs(dataCheckout - dataCheckin);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // diferença em dias
    const custoTotal = diffDays * precoDiaria;

    const reserva = {
        hospedeNome,
        quartoNumero,
        dataCheckin,
        dataCheckout,
        custoTotal
    };

    reservas.push(reserva);
    document.getElementById('mensagem-reserva').innerText = `Reserva realizada com sucesso para ${hospedeNome}. Custo Total: R$ ${custoTotal.toFixed(2)}`;
    localStorage.setItem('reservas', JSON.stringify(reservas));
});

// Função para alugar quartos na recepção
document.getElementById('form-aluguel').addEventListener('submit', (event) => {
    event.preventDefault();
    const hospedeNome = document.getElementById('hospede-aluguel').value;
    const quartoNumero = document.getElementById('quarto-aluguel').value;

    const aluguel = {
        hospedeNome,
        quartoNumero
    };

    alugueis.push(aluguel);
    document.getElementById('mensagem-aluguel').innerText = `Quarto ${quartoNumero} alugado para ${hospedeNome}.`;
    localStorage.setItem('alugueis', JSON.stringify(alugueis));
});

// Função para solicitar serviços
document.getElementById('form-servicos').addEventListener('submit', (event) => {
    event.preventDefault();
    const hospedeNome = document.getElementById('hospede-servico').value;
    const servicoEscolhido = document.getElementById('servico').value;

    const servico = {
        hospedeNome,
        servicoEscolhido
    };

    servicos.push(servico);
    document.getElementById('mensagem-servico').innerText = `Serviço ${servicoEscolhido} solicitado por ${hospedeNome}.`;
    localStorage.setItem('servicos', JSON.stringify(servicos));
});

// Função para registrar consumo do frigobar
document.getElementById('form-frigobar').addEventListener('submit', (event) => {
    event.preventDefault();
    const hospedeNome = document.getElementById('hospede-frigobar').value;
    const itemConsumido = document.getElementById('item-frigobar').value;
    const quantidadeConsumida = parseInt(document.getElementById('quantidade-frigobar').value);

    const consumo = {
        hospedeNome,
        itemConsumido,
        quantidadeConsumida
    };

    consumosFrigobar.push(consumo);
    document.getElementById('mensagem-frigobar').innerText = `Consumo registrado: ${quantidadeConsumida} de ${itemConsumido} para ${hospedeNome}.`;
    localStorage.setItem('consumosFrigobar', JSON.stringify(consumosFrigobar));
});

// Função para adicionar valores à conta do hóspede
function addToConta(hospedeNome, valor) {
    const contaIndex = contas.findIndex(c => c.hospedeNome === hospedeNome);

    if (contaIndex >= 0) {
        contas[contaIndex].total += valor;
    } else {
        contas.push({ hospedeNome, total: valor });
    }
    localStorage.setItem('contas', JSON.stringify(contas));
}

// Função para visualizar a conta do hóspede
document.getElementById('form-contas').addEventListener('submit', (event) => {
    event.preventDefault();
    const hospedeNome = document.getElementById('hospede-conta').value;
    const conta = contas.find(c => c.hospedeNome === hospedeNome);

    if (conta) {
        document.getElementById('detalhes-conta').style.display = 'block';
        document.getElementById('detalhes').innerText = `Total a Pagar: R$ ${conta.total.toFixed(2)}`;
    } else {
        document.getElementById('mensagem-conta').innerText = 'Hóspede não encontrado ou sem conta.';
    }
});

// Função para efetuar pagamento da conta
document.getElementById('pagar-conta').addEventListener('click', () => {
    const hospedeNome = document.getElementById('hospede-conta').value;
    const contaIndex = contas.findIndex(c => c.hospedeNome === hospedeNome);

    if (contaIndex >= 0) {
        contas.splice(contaIndex, 1); // Remove a conta após o pagamento
        document.getElementById('mensagem-conta').innerText = `Conta de ${hospedeNome} paga com sucesso!`;
        document.getElementById('detalhes-conta').style.display = 'none';
    } else {
        document.getElementById('mensagem-conta').innerText = 'Hóspede não encontrado ou conta já paga.';
    }
});

// Função para iniciar o check-out
document.getElementById('form-checkout').addEventListener('submit', (event) => {
    event.preventDefault();
    const hospedeNome = document.getElementById('hospede-checkout').value;
    const conta = contas.find(c => c.hospedeNome === hospedeNome);

    if (conta) {
        document.getElementById('detalhes-checkout-conta').innerText = `Total a Pagar: R$ ${conta.total.toFixed(2)}`;
        document.getElementById('detalhes-checkout').style.display = 'block';
    } else {
        document.getElementById('mensagem-checkout').innerText = 'Hóspede não encontrado ou sem conta.';
    }
});

// Função para pagar conta e fazer check-out
document.getElementById('pagar-checkout').addEventListener('click', () => {
    const hospedeNome = document.getElementById('hospede-checkout').value;
    const contaIndex = contas.findIndex(c => c.hospedeNome === hospedeNome);

    if (contaIndex >= 0) {
        contas.splice(contaIndex, 1); // Remove a conta após o pagamento
        document.getElementById('mensagem-checkout').innerText = `Check-out de ${hospedeNome} realizado com sucesso!`;
        document.getElementById('detalhes-checkout').style.display = 'none';
    } else {
        document.getElementById('mensagem-checkout').innerText = 'Hóspede não encontrado ou conta já paga.';
    }
});

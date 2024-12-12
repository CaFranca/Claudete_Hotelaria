// Recupera os dados dos hóspedes e reservas do localStorage
let hospedes = JSON.parse(localStorage.getItem('hospedes')) || [];
let reservasExistentes = JSON.parse(localStorage.getItem('reservas')) || [];

// Seleciona o elemento de seleção para hóspedes
const selectHospede = document.getElementById('hospede-reserva');

// Preenche a lista suspensa com os nomes dos hóspedes
hospedes.forEach(hospede => {
    const option = document.createElement('option');
    option.value = hospede.documento; // Usa o documento como valor
    option.textContent = hospede.nome; // Exibe o nome do hóspede
    selectHospede.appendChild(option);
});

// Função para calcular o preço da estadia
function calcularPrecoEstadia() {
    const dataCheckin = new Date(document.getElementById('data-checkin').value);
    const dataCheckout = new Date(document.getElementById('data-checkout').value);
    const tipoQuarto = document.getElementById('tipo-quarto').value;

    if (!dataCheckin || !dataCheckout || dataCheckout <= dataCheckin) {
        return 'Selecione datas válidas para a reserva';
    }

    const milissegundosPorDia = 86400000;
    const diasEstadia = Math.floor((dataCheckout - dataCheckin) / milissegundosPorDia);
    const precoDiaria = tipoQuarto === 'premium' ? 64.99 : 39.99;

    return (diasEstadia * precoDiaria).toFixed(2);
}

// Atualiza o preço da estadia sempre que datas ou tipo de quarto são modificados
document.getElementById('data-checkin').addEventListener('change', () => {
    document.getElementById('mensagem-reserva').textContent = `O preço da estadia será R$ ${calcularPrecoEstadia()}`;
});
document.getElementById('data-checkout').addEventListener('change', () => {
    document.getElementById('mensagem-reserva').textContent = `O preço da estadia será R$ ${calcularPrecoEstadia()}`;
});
document.getElementById('tipo-quarto').addEventListener('change', () => {
    document.getElementById('mensagem-reserva').textContent = `O preço da estadia será R$ ${calcularPrecoEstadia()}`;
});

// Adiciona um evento para o formulário de reservas
document.getElementById('form-reservas').addEventListener('submit', (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    // Captura os dados do formulário
    const hospedeSelecionado = selectHospede.value; // Captura o documento do hóspede selecionado
    const dataCheckin = document.getElementById('data-checkin').value;
    const dataCheckout = document.getElementById('data-checkout').value;
    const quartoReserva = document.getElementById('quarto-reserva').value;
    const tipoQuarto = document.getElementById('tipo-quarto').value;
    const precoEstadia = calcularPrecoEstadia();

    // Verifica se o quarto já está reservado
    const quartoReservado = reservasExistentes.find(reserva => reserva.numeroQuarto === quartoReserva &&
        ((dataCheckin >= reserva.dataCheckin && dataCheckin <= reserva.dataCheckout) ||
        (dataCheckout >= reserva.dataCheckin && dataCheckout <= reserva.dataCheckout)));

    if (quartoReservado) {
        document.getElementById('mensagem-reserva').textContent = 'Este quarto já está reservado para as datas selecionadas.';
        return; // Encerra a execução se o quarto já estiver reservado
    }

    // Encontra o hóspede correspondente usando o documento
    const hospede = hospedes.find(h => h.documento === hospedeSelecionado);

    // Atualiza ou adiciona a reserva do hóspede
    if (hospede) {
        // Cria um objeto de reserva com um ID único
        const novaReserva = {
            id: Date.now(), // Gera um ID único com base no timestamp
            documentoHospede: hospedeSelecionado,
            dataCheckin,
            dataCheckout,
            numeroQuarto: quartoReserva,
            tipoQuarto,
            precoEstadia, // Adiciona o preço da estadia calculado
        };

        // Adiciona a nova reserva à lista de reservas
        reservasExistentes.push(novaReserva);
        document.getElementById('mensagem-reserva').textContent = `Reserva realizada para ${hospede.nome}. O preço da estadia será R$ ${precoEstadia}.`;

        // Atualiza o histórico de reservas
        let historicoReservas = JSON.parse(localStorage.getItem('historicoReservas')) || [];
        historicoReservas.push(novaReserva); // Adiciona a reserva ao histórico
        localStorage.setItem('historicoReservas', JSON.stringify(historicoReservas)); // Atualiza o localStorage
    } else {
        document.getElementById('mensagem-reserva').textContent = 'Hóspede não encontrado.';
    }

    // Salva as alterações no localStorage
    localStorage.setItem('reservas', JSON.stringify(reservasExistentes));
    localStorage.setItem('hospedes', JSON.stringify(hospedes));
});

// Função para remover uma reserva
function removerReserva(reservaId) {
    // Encontra o índice da reserva a ser removida
    const reservaIndex = reservasExistentes.findIndex(reserva => reserva.id === reservaId);

    if (reservaIndex !== -1) {
        if (confirm('Deseja realmente remover esta reserva?')) {
            reservasExistentes.splice(reservaIndex, 1);
            localStorage.setItem('reservas', JSON.stringify(reservasExistentes));

            // Atualiza o histórico de reservas
            let historicoReservas = JSON.parse(localStorage.getItem('historicoReservas')) || [];
            historicoReservas = historicoReservas.filter(reserva => reserva.id !== reservaId); // Remove do histórico
            localStorage.setItem('historicoReservas', JSON.stringify(historicoReservas)); // Atualiza o histórico no localStorage

            alert('Reserva removida com sucesso.');
        }
    } else {
        alert('Erro: Reserva não encontrada.');
    }
}

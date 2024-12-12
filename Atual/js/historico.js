// Recupera o histórico de reservas do localStorage, ou inicializa com um array vazio caso não existam registros
const historicoReservas = JSON.parse(localStorage.getItem('historicoReservas')) || [];

// Recupera a lista de hóspedes do localStorage, ou inicializa com um array vazio caso não existam registros
const hospedes = JSON.parse(localStorage.getItem('hospedes')) || [];

// Seleciona o elemento <tbody> da tabela onde as informações de reservas serão exibidas
const tabelaHistorico = document.getElementById('tabela-historico').getElementsByTagName('tbody')[0];

// Função para buscar o nome do hóspede pelo número de documento
function buscarNomeHospede(documentoHospede) {
    // Procura o hóspede na lista usando o documento como referência
    const hospede = hospedes.find(h => h.documento === documentoHospede);

    // Retorna o nome do hóspede, ou uma mensagem indicando que ele não foi encontrado
    return hospede ? hospede.nome : 'Hóspede removido ou não encontrado';
}

// Função para exibir o histórico de reservas na tabela
function exibirHistorico() {
    if (historicoReservas.length > 0) { // Verifica se existem reservas no histórico
        historicoReservas.forEach(reserva => {
            const row = document.createElement('tr'); // Cria uma nova linha para a tabela

            // Obtém o nome do hóspede associado à reserva
            const nomeHospede = buscarNomeHospede(reserva.documentoHospede);

            // Preenche a linha com os dados da reserva
            row.innerHTML = `
                <td>${nomeHospede}</td>
                <td>${reserva.dataCheckin}</td>
                <td>${reserva.dataCheckout}</td>
                <td>${reserva.numeroQuarto}</td>
                <td>${reserva.tipoQuarto}</td>
                <td>R$ ${reserva.precoEstadia}</td>
            `;

            tabelaHistorico.appendChild(row); // Adiciona a linha preenchida à tabela
        });
    } else {
        // Exibe uma mensagem indicando que não há reservas, caso o histórico esteja vazio
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="6" style="text-align:center;">Nenhuma reserva encontrada.</td>';
        tabelaHistorico.appendChild(row); // Adiciona a mensagem à tabela
    }
}

// Executa a função para exibir o histórico de reservas ao carregar a página
exibirHistorico();

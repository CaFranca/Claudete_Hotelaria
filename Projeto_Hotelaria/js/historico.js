// Recupera o histórico de reservas do localStorage
const historicoReservas = JSON.parse(localStorage.getItem('historicoReservas')) || [];

// Recupera os hóspedes para buscar o nome de cada um
const hospedes = JSON.parse(localStorage.getItem('hospedes')) || [];

// Seleciona o elemento da tabela onde as reservas serão exibidas
const tabelaHistorico = document.getElementById('tabela-historico').getElementsByTagName('tbody')[0];

// Função para buscar o nome do hóspede pelo documento
function buscarNomeHospede(documentoHospede) {
    const hospede = hospedes.find(h => h.documento === documentoHospede);
    return hospede ? hospede.nome : 'Hóspede removido ou não encontrado';
}

// Função para exibir o histórico de reservas
function exibirHistorico() {
    // Verifica se existem reservas
    if (historicoReservas.length > 0) {
        historicoReservas.forEach(reserva => {
            const row = document.createElement('tr');

            // Obtém o nome do hóspede
            const nomeHospede = buscarNomeHospede(reserva.documentoHospede);

            // Cria as células da tabela com os dados da reserva
            row.innerHTML = `
                <td>${nomeHospede}</td>
                <td>${reserva.dataCheckin}</td>
                <td>${reserva.dataCheckout}</td>
                <td>${reserva.numeroQuarto}</td>
                <td>${reserva.tipoQuarto}</td>
                <td>R$ ${reserva.precoEstadia}</td>
            `;
            tabelaHistorico.appendChild(row);
        });
    } else {
        // Exibe uma mensagem de "nenhuma reserva encontrada" se não houver registros
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="6" style="text-align:center;">Nenhuma reserva encontrada.</td>';
        tabelaHistorico.appendChild(row);
    }
}

// Exibe o histórico de reservas ao carregar a página
document.addEventListener('DOMContentLoaded', exibirHistorico);

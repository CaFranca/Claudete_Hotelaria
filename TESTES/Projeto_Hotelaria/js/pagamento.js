// Recupera o documento do hóspede a partir da URL
const urlParams = new URLSearchParams(window.location.search);
const documentoHospede = urlParams.get('documento');

// Recupera os dados dos hóspedes e reservas do localStorage
let hospedes = JSON.parse(localStorage.getItem('hospedes')) || [];
let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
let frigobar = JSON.parse(localStorage.getItem('frigobar')) || [];
let frigobarExtra = 0

// Encontra o hóspede pelo documento
for (let i = 0; i < frigobar.length; i++) {
    if (hospedes[i].documento == documentoHospede) {
        frigobarExtra = frigobar[i].precoTotal
    }
}
const hospede = hospedes.find(h => h.documento === documentoHospede);
if (hospede) {
    // Filtra as reservas para o hóspede atual
    const reservasDoHospede = reservas.filter(reserva => reserva.documentoHospede === hospede.documento);

    // Exibe as informações do hóspede e o total a pagar
    let detalhesPagamento = `
                    <h2>Hospede: ${hospede.nome}</h2>
                    <p>Documento: ${hospede.documento}</p>
                    <h3>Reservas:</h3>
                    <ul>
                `;

    // Adiciona as reservas à lista
    reservasDoHospede.forEach(reserva => {
        // Exibe informações sobre o quarto
        detalhesPagamento += `
                        <li>
                            Quarto: ${reserva.numeroQuarto}, Check-in: ${reserva.dataCheckin}, Check-out: ${reserva.dataCheckout}, Preço: R$${reserva.precoEstadia}`

        // Exibe os serviços solicitados e seus preços
        if (reserva.servicos && reserva.servicos.length > 0) {
            detalhesPagamento += `<br><strong>Frigobar:</strong><ul>`;
            reserva.servicos.forEach(servico => {
                detalhesPagamento += `
                                <li>${servico.nome} - R$ ${servico.preco}</li>
                            `;
            });
            detalhesPagamento += `</ul>`;
        } else {
            detalhesPagamento += `<br><strong>Serviços:</strong> Nenhum serviço do frigobar foi solicitado.</br>`;
        }

        detalhesPagamento += `</li>`;
    });

    // Calcula o total a pagar, incluindo o preço da estadia e dos serviços
    const totalPagar = reservasDoHospede.reduce((total, reserva) => {
        const totalReserva = parseFloat(reserva.precoEstadia) + (reserva.servicos ? reserva.servicos.reduce((totalServico, servico) => totalServico + parseFloat(servico.preco), 0) : 0);
        return total + totalReserva;
    }, 0);

    detalhesPagamento += `
                    </ul>
                    <h3>Total a pagar: R$ ${(totalPagar + frigobarExtra).toFixed(2)}</h3>
                `;

    document.getElementById('detalhes-pagamento').innerHTML = detalhesPagamento;
} else {
    alert('Hóspede não encontrado.');
    window.location.href = 'index.html';
}
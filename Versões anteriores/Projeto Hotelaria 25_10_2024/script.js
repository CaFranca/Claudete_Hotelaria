// Função para exibir as reservas na página "reservas.html"
function exibirReservas(filtro = 'alfabetico') {
    const listaReservas = document.getElementById('lista-reservas');
    listaReservas.innerHTML = '';

    let reservasFiltradas = [...reservas]; // Cópia da lista de reservas

    // Ordena as reservas com base no filtro
    switch (filtro) {
        case 'alfabetico':
            reservasFiltradas.sort((a, b) => a.hospedeNome.localeCompare(b.hospedeNome));
            break;
        case 'quarto':
            reservasFiltradas.sort((a, b) => a.quartoNumero - b.quartoNumero);
            break;
        case 'checkin':
            reservasFiltradas.sort((a, b) => new Date(a.dataCheckin) - new Date(b.dataCheckin));
            break;
    }

    // Renderiza cada reserva na lista
    reservasFiltradas.forEach(reserva => {
        const li = document.createElement('li');
        li.classList.add('reserva-item');
        li.innerHTML = `
            <strong>Hóspede:</strong> ${reserva.hospedeNome}<br>
            <strong>Quarto:</strong> ${reserva.quartoNumero}<br>
            <strong>Check-in:</strong> ${reserva.dataCheckin}<br>
            <strong>Check-out:</strong> ${reserva.dataCheckout}<br>
            <strong>Serviços:</strong> ${reserva.servicos.join(', ') || 'Nenhum'}<br>
            <strong>Total:</strong> R$${reserva.total.toFixed(2)}
        `;
        listaReservas.appendChild(li);
    });
}

// Ação do botão de filtro
document.getElementById('filtrar').addEventListener('click', () => {
    const filtroSelecionado = document.getElementById('ordenar').value;
    exibirReservas(filtroSelecionado);
});

// Inicializa a exibição das reservas ao carregar a página "reservas.html"
window.addEventListener('load', () => {
    exibirReservas();
});

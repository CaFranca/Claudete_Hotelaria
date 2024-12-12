// Arrays para armazenar dados
let reservas = [];

// Dados simulados de reservas já feitas
const reservasSimuladas = [
    { hospedeNome: "Bernardo Bertoldo", quartoNumero: "101", dataCheckin: "2024-10-01", dataCheckout: "2024-10-05", servicoAdicional: ["Café da Manhã"] },
    { hospedeNome: "Bruno Timoteo", quartoNumero: "102", dataCheckin: "2024-10-02", dataCheckout: "2024-10-06", servicoAdicional: ["Traslado Aeroporto"] },
    { hospedeNome: "Caique França", quartoNumero: "103", dataCheckin: "2024-10-03", dataCheckout: "2024-10-07", servicoAdicional: ["Wi-Fi Premium"] },
    { hospedeNome: "Felipe Azali", quartoNumero: "104", dataCheckin: "2024-10-04", dataCheckout: "2024-10-08", servicoAdicional: ["Spa"] }
];

// Adicionar reservas simuladas ao array
reservas.push(...reservasSimuladas);

// Função para exibir as reservas na página de reservas
function mostrarReservas(ordenarPor) {
    const listaReservas = document.getElementById("lista-reservas");
    listaReservas.innerHTML = ""; // Limpa a lista antes de adicionar as reservas

    // Ordena as reservas com base na escolha do usuário
    if (ordenarPor === 'alfabetico') {
        reservas.sort((a, b) => a.hospedeNome.localeCompare(b.hospedeNome));
    } else if (ordenarPor === 'quarto') {
        reservas.sort((a, b) => a.quartoNumero - b.quartoNumero);
    } else if (ordenarPor === 'checkin') {
        reservas.sort((a, b) => new Date(a.dataCheckin) - new Date(b.dataCheckin));
    }

    reservas.forEach(reserva => {
        const li = document.createElement("li");
        li.className = "reserva-item"; // Adiciona a classe para estilo
        li.innerHTML = `<strong>Nome:</strong> ${reserva.hospedeNome}<br>
                        <strong>Quarto:</strong> ${reserva.quartoNumero}<br>
                        <strong>Check-in:</strong> ${reserva.dataCheckin}<br>
                        <strong>Check-out:</strong> ${reserva.dataCheckout}<br>
                        <strong>Serviços Adicionais:</strong> ${reserva.servicoAdicional.join(", ")}`;
        listaReservas.appendChild(li);
    });
}

// Chame a função para mostrar as reservas ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    mostrarReservas('alfabetico'); // Exibe reservas inicialmente em ordem alfabética

    // Adiciona evento de mudança para o select de ordenação
    const selectOrdenar = document.getElementById("ordenar");
    selectOrdenar.addEventListener("change", function() {
        mostrarReservas(selectOrdenar.value); // Atualiza a lista com a nova ordenação
    });
    
    // Evento para aplicar filtro ao clicar no botão
    const botaoFiltrar = document.getElementById("filtrar");
    botaoFiltrar.addEventListener("click", function() {
        mostrarReservas(selectOrdenar.value); // Atualiza a lista com a nova ordenação ao clicar no botão
    });
});

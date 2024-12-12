// Recupera os dados dos hóspedes e reservas do localStorage
let hospedes = JSON.parse(localStorage.getItem('hospedes')) || [];
let reservas = JSON.parse(localStorage.getItem('reservas')) || [];

// Seleciona o elemento tbody para inserir as linhas dos hóspedes
const listaHospedes = document.getElementById('lista-hospedes');

// Função para exibir a lista de hóspedes
function exibirHospedes(filtroId = '', filtroNome = '', ordenacaoId = 'crescente', ordenacaoNome = 'crescente') {
    // Limpa a lista atual
    listaHospedes.innerHTML = '';

    // Filtra hóspedes com base nos critérios
    let filtrados = hospedes.filter((hospede, index) => {
        const id = index + 1; // O ID é o índice + 1
        return (
            (filtroId === '' || String(id).includes(filtroId)) && 
            (filtroNome === '' || hospede.nome.toLowerCase().includes(filtroNome.toLowerCase()))
        );
    });

    // Ordena os hóspedes filtrados por ID
    if (ordenacaoId === 'crescente') {
        filtrados.sort((a, b) => hospedes.indexOf(a) - hospedes.indexOf(b));
    } else {
        filtrados.sort((a, b) => hospedes.indexOf(b) - hospedes.indexOf(a));
    }

    // Adiciona ordenação por Nome
    if (ordenacaoNome === 'crescente') {
        filtrados.sort((a, b) => a.nome.localeCompare(b.nome));
    } else {
        filtrados.sort((a, b) => b.nome.localeCompare(a.nome));
    }

    // Exibe os hóspedes filtrados
    if (filtrados.length > 0) {
        filtrados.forEach((hospede, index) => {
            const row = document.createElement('tr');
            
            // Filtra as reservas para o hóspede atual
            const reservasDoHospede = reservas.filter(reserva => reserva.documentoHospede === hospede.documento);
            
            // Prepara as informações de reservas
            const reservasInfo = reservasDoHospede.map(reserva => 
                `Quarto: ${reserva.numeroQuarto}, Check-in: ${reserva.dataCheckin}, Check-out: ${reserva.dataCheckout}, Preço da estadia: R$${reserva.precoEstadia}`
            ).join('<br>') || 'Nenhuma reserva';

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${hospede.nome}</td>
                <td>${hospede.documento}</td>
                <td>${hospede.endereco}</td>
                <td>${hospede.contato}</td>
                <td>${reservasInfo}</td>
            `;
            listaHospedes.appendChild(row);
        });
    } else {
        // Exibe uma mensagem caso não haja hóspedes cadastrados
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="6" style="text-align: center;">Nenhum hóspede encontrado.</td>`;
        listaHospedes.appendChild(row);
    }
}

// Adiciona o evento de filtragem
document.getElementById('btn-filtrar').addEventListener('click', () => {
    const filtroId = document.getElementById('filtro-id').value.trim();
    const filtroNome = document.getElementById('filtro-nome').value.trim();
    const ordenacaoId = document.getElementById('ordenacao-id').value;
    const ordenacaoNome = document.getElementById('ordenacao-nome').value;
    exibirHospedes(filtroId, filtroNome, ordenacaoId, ordenacaoNome);
});

// Adiciona evento para atualizar a lista de hóspedes conforme digitação
document.getElementById('filtro-nome').addEventListener('input', () => {
    const filtroId = document.getElementById('filtro-id').value.trim();
    const filtroNome = document.getElementById('filtro-nome').value.trim();
    const ordenacaoId = document.getElementById('ordenacao-id').value;
    const ordenacaoNome = document.getElementById('ordenacao-nome').value;
    exibirHospedes(filtroId, filtroNome, ordenacaoId, ordenacaoNome);
});

// Adiciona evento para atualizar a lista de hóspedes conforme digitação no filtro de ID
document.getElementById('filtro-id').addEventListener('input', () => {
    const filtroId = document.getElementById('filtro-id').value.trim();
    const filtroNome = document.getElementById('filtro-nome').value.trim();
    const ordenacaoId = document.getElementById('ordenacao-id').value;
    const ordenacaoNome = document.getElementById('ordenacao-nome').value;
    exibirHospedes(filtroId, filtroNome, ordenacaoId, ordenacaoNome);
});

// Adiciona o evento para limpar os filtros
document.getElementById('btn-limpar').addEventListener('click', () => {
    document.getElementById('filtro-id').value = ''; // Limpa o filtro de ID
    document.getElementById('filtro-nome').value = ''; // Limpa o filtro de Nome
    document.getElementById('ordenacao-id').value = 'crescente'; // Reseta a ordenação de ID
    document.getElementById('ordenacao-nome').value = 'crescente'; // Reseta a ordenação de Nome
    exibirHospedes(); // Exibe todos os hóspedes
});

// Exibe todos os hóspedes ao carregar a página
exibirHospedes();

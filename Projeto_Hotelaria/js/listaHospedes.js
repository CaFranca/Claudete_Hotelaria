// Recupera os dados dos hóspedes e reservas do localStorage
let hospedes = JSON.parse(localStorage.getItem('hospedes')) || [];
let reservas = JSON.parse(localStorage.getItem('reservas')) || [];

// Seleciona o elemento tbody para inserir as linhas dos hóspedes
const listaHospedes = document.getElementById('lista-hospedes');

// Função para exibir a lista de hóspedes
function exibirHospedes(filtroNome = '', ordenacaoNome = 'crescente') {
    listaHospedes.innerHTML = '';

    // Faz uma cópia da lista de hóspedes para evitar alterações diretas
    let listaFiltrada = [...hospedes];

    // Filtra hóspedes com base no nome
    if (filtroNome) {
        listaFiltrada = listaFiltrada.filter(hospede =>
            hospede.nome.toLowerCase().includes(filtroNome.toLowerCase())
        );
    }

    // Ordena hóspedes por nome
    listaFiltrada.sort((a, b) =>
        ordenacaoNome === 'crescente'
            ? a.nome.localeCompare(b.nome)
            : b.nome.localeCompare(a.nome)
    );

    // Exibe os hóspedes ou mensagem caso a lista esteja vazia
    if (listaFiltrada.length > 0) {
        document.getElementById('esconder').style.display = 'block';
        listaFiltrada.forEach((hospede, index) => {
            const reservasDoHospede = reservas.filter(reserva => reserva.documentoHospede === hospede.documento);
            const reservasInfo = reservasDoHospede.map(reserva => `
                Quarto: ${reserva.numeroQuarto}, 
                Check-in: ${reserva.dataCheckin}, 
                Check-out: ${reserva.dataCheckout}, 
                Preço: R$ ${reserva.precoEstadia}, 
                Serviços: ${reserva.servicos?.join(', ') || 'Nenhum'}
            `).join('<br>') || 'Nenhuma reserva';

            const totalPagar = reservasDoHospede.reduce(
                (total, reserva) => total + parseFloat(reserva.precoEstadia || 0),
                0
            ).toFixed(2);

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${hospede.nome}</td>
                <td>${hospede.documento}</td>
                <td>${hospede.endereco}</td>
                <td>${hospede.contato}</td>
                <td>${reservasInfo}</td>
                <td>R$ ${totalPagar}</td>
                <td>
                    <button class="btn-remover-hospede" data-documento="${hospede.documento}">Remover</button>
                </td>
                <td>
                    ${reservasDoHospede.map(reserva => `
                        <button class="btn-remover-reserva" data-numero-quarto="${reserva.numeroQuarto}">Remover</button>
                    `).join('<br>')}
                </td>
                <td>
                    <button class="btn-pagamento" data-documento="${hospede.documento}">Pagamento</button>
                </td>
            `;
            listaHospedes.appendChild(row);
        });
    } else {
        document.getElementById('esconder').style.display = 'none';
        listaHospedes.innerHTML = `<tr><td colspan="10" style="text-align: center;">Nenhum hóspede encontrado.</td></tr>`;
    }

    // Adiciona os eventos
    document.querySelectorAll('.btn-remover-hospede').forEach(button => {
        button.addEventListener('click', () => removerHospede(button.dataset.documento));
    });

    document.querySelectorAll('.btn-remover-reserva').forEach(button => {
        button.addEventListener('click', () => removerReserva(button.dataset.numeroQuarto));
    });

    document.querySelectorAll('.btn-pagamento').forEach(button => {
        button.addEventListener('click', () => {
            const documento = button.dataset.documento;
            window.location.href = `pagamento.html?documento=${documento}`;
        });
    });
}

// Função para remover um hóspede
function removerHospede(documento) {
    const index = hospedes.findIndex(hospede => hospede.documento === documento);

    if (index !== -1) {
        if (confirm(`Deseja remover o hóspede "${hospedes[index].nome}"?`)) {
            hospedes.splice(index, 1);
            localStorage.setItem('hospedes', JSON.stringify(hospedes));
            alert('Hóspede removido com sucesso.');
            exibirHospedes();
        }
    } else {
        alert('Hóspede não encontrado.');
    }
}

// Função para remover uma reserva
function removerReserva(numeroQuarto) {
    const reservaIndex = reservas.findIndex(reserva => reserva.numeroQuarto === numeroQuarto);

    if (reservaIndex !== -1) {
        if (confirm('Deseja remover esta reserva?')) {
            reservas.splice(reservaIndex, 1);
            localStorage.setItem('reservas', JSON.stringify(reservas));
            alert('Reserva removida com sucesso.');
            exibirHospedes();
        }
    } else {
        alert('Reserva não encontrada.');
    }
}

// Eventos para filtros
document.getElementById('btn-filtrar').addEventListener('click', () => {
    const filtroNome = document.getElementById('filtro-nome').value.trim();
    const ordenacaoNome = document.getElementById('ordenacao-nome').value;
    exibirHospedes(filtroNome, ordenacaoNome);
});

document.getElementById('btn-limpar').addEventListener('click', () => {
    document.getElementById('filtro-nome').value = '';
    document.getElementById('ordenacao-nome').value = 'crescente';
    exibirHospedes();
});

document.getElementById('btn-limpar-tudo').addEventListener('click', () => {
    if (confirm('Deseja limpar todos os dados?')) {
        hospedes = [];
        reservas = [];
        localStorage.clear();
        exibirHospedes();
        alert('Todos os dados foram apagados.');
    }
});

// Carrega a lista inicial
exibirHospedes();

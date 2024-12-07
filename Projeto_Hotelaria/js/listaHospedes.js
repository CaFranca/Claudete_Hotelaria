// Recupera os dados dos hóspedes e reservas do localStorage
let hospedes = JSON.parse(localStorage.getItem('hospedes')) || [];
let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
let frigobar = JSON.parse(localStorage.getItem('frigobar')) || [];


// Seleciona o elemento tbody para inserir as linhas dos hóspedes
const listaHospedes = document.getElementById('lista-hospedes');

// Função para exibir a lista de hóspedes
function exibirHospedes(filtroNome = '', ordenacaoId = 'crescente', ordenacaoNome = 'crescente') {
    // Limpa a lista atual
    listaHospedes.innerHTML = '';

    // Filtra hóspedes com base nos critérios
    let filtrados = hospedes.filter(hospede => {
        return filtroNome === '' || hospede.nome.toLowerCase().includes(filtroNome.toLowerCase());
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
        let div = document.getElementById('esconder');
        div.style.display = 'block';
        filtrados.forEach((hospede, index) => {
            const row = document.createElement('tr');

            // Filtra as reservas para o hóspede atual
            const reservasDoHospede = reservas.filter(reserva => reserva.documentoHospede === hospede.documento);

            // Prepara as informações de reservas
            const reservasInfo = reservasDoHospede.map(reserva => {
                const listaServicos = reserva.servicos ? reserva.servicos.join(', ') : 'Nenhum serviço';
                return `Quarto: ${reserva.numeroQuarto}, Check-in: ${reserva.dataCheckin}, Check-out: ${reserva.dataCheckout}, Preço da estadia: R$ ${reserva.precoEstadia}, Serviços: ${listaServicos}`;
            }).join('<br>') || 'Nenhuma reserva';

            // Calcula o total a pagar para o hóspede (soma dos preços das reservas)
            const totalPagar = reservasDoHospede.reduce((total, reserva) => {
                return total + parseFloat(reserva.precoEstadia || 0); // Certifique-se de que está somando corretamente
            }, 0);

            // Adiciona a linha com as novas colunas
            row.innerHTML = `
            <td>${index + 1}</td>
            <td>${hospede.nome}</td>
            <td>${hospede.documento}</td>
            <td>${hospede.endereco}</td>
            <td>${hospede.contato}</td>
            <td>${reservasInfo}</td>
            <td>${reservas.servicos}</td>
            <td>R$ ${(totalPagar + frigobar[index].precoTotal).toFixed(2)}</td>
            <td>
                <button class="btn-remover-hospede" data-documento="${hospede.documento}">Remover</button>
            </td>
            <td>
                ${reservasDoHospede.map(reserva => 
                    `<button class="btn-remover-reserva" data-numero-quarto="${reserva.numeroQuarto}">Remover Reserva</button>`
                ).join('<br>')}
            </td>
            <td>
                <button class="btn-pagamento" data-documento="${hospede.documento}">Ir para o pagamento</button>
            </td>
        `;
        listaHospedes.appendChild(row);  
        });
    } else {
        let div = document.getElementById('esconder');
        div.style.display = 'none';
        // Exibe uma mensagem caso não haja hóspedes cadastrados
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="8" style="text-align: center;">Nenhum hóspede encontrado.</td>`;
        listaHospedes.appendChild(row);
    }
    // Adiciona o evento para o botão de pagamento
    document.querySelectorAll('.btn-pagamento').forEach(button => {
        button.addEventListener('click', (event) => {
            const documento = event.target.getAttribute('data-documento');
            window.location.href = `pagamento.html?documento=${documento}`;
        });
    });

    // Adiciona o evento para remover o hóspede
    document.querySelectorAll('.btn-remover-hospede').forEach(button => {
        button.addEventListener('click', (event) => {
            const documento = event.target.getAttribute('data-documento');
            removerHospede(documento);
        });
    });

    // Adiciona o evento para remover a reserva
    document.querySelectorAll('.btn-remover-reserva').forEach(button => {
        button.addEventListener('click', (event) => {
            // Captura o número do quarto diretamente do atributo data-numero-quarto
            const numeroQuarto = event.target.getAttribute('data-numero-quarto');
            
            // Chama a função de remoção passando apenas o número do quarto
            removerReserva(numeroQuarto);
        });
    });
}


// Função para remover um hóspede
function removerHospede(documento) {
    const index = hospedes.findIndex(hospede => hospede.documento === documento);

    if (index !== -1) {
        if (confirm(`Deseja realmente remover o hóspede "${hospedes[index].nome}"?`)) {
            hospedes.splice(index, 1);
            frigobar.splice(index, 1)
            localStorage.setItem('hospedes', JSON.stringify(hospedes));
            localStorage.setItem('frigobar', JSON.stringify(frigobar));
            alert('Hóspede removido com sucesso.');
            exibirHospedes();
        }
    } else {
        alert('Erro: Hóspede não encontrado.');
    }
}

function removerReserva(numeroQuarto) {
    console.log('Tentando remover a reserva para o quarto:', numeroQuarto); // Verifique o valor do número do quarto

    // Encontra o índice da reserva pelo número do quarto
    const reservaIndex = reservas.findIndex(reserva => reserva.numeroQuarto === numeroQuarto);

    if (reservaIndex !== -1) {
        if (confirm('Deseja realmente remover esta reserva?')) {
            reservas.splice(reservaIndex, 1); // Remove a reserva do array
            localStorage.setItem('reservas', JSON.stringify(reservas)); // Atualiza o localStorage
            alert('Reserva removida com sucesso.');
            exibirHospedes(); // Atualiza a lista de hóspedes
        }
    } else {
        alert('Erro: Reserva não encontrada.');
    }
}

// Adiciona o evento de filtragem
document.getElementById('btn-filtrar').addEventListener('click', () => {
    const filtroNome = document.getElementById('filtro-nome').value.trim();
    const ordenacaoId = document.getElementById('ordenacao-id').value;
    const ordenacaoNome = document.getElementById('ordenacao-nome').value;
    exibirHospedes(filtroNome, ordenacaoId, ordenacaoNome);
});

// Adiciona evento para atualizar a lista de hóspedes conforme digitação
document.getElementById('filtro-nome').addEventListener('input', () => {
    const filtroNome = document.getElementById('filtro-nome').value.trim();
    const ordenacaoId = document.getElementById('ordenacao-id').value;
    const ordenacaoNome = document.getElementById('ordenacao-nome').value;
    exibirHospedes(filtroNome, ordenacaoId, ordenacaoNome);
});

// Adiciona o evento para limpar os filtros
document.getElementById('btn-limpar').addEventListener('click', () => {
    document.getElementById('filtro-nome').value = '';
    document.getElementById('ordenacao-id').value = 'crescente';
    document.getElementById('ordenacao-nome').value = 'crescente';
    exibirHospedes();
});

// Adiciona o evento para limpar todos os dados
document.getElementById('btn-limpar-tudo').addEventListener('click', () => {
    if (confirm("Deseja realmente limpar todos os dados (hóspedes e reservas)?")) {
        localStorage.removeItem('hospedes');
        localStorage.removeItem('reservas');
        localStorage.removeItem('frigobar');
        hospedes = [];
        reservas = [];
        frigobar = [];
        exibirHospedes();
        alert('Todos os dados foram apagados!');
    }
});

// Exibe todos os hóspedes ao carregar a página
exibirHospedes();

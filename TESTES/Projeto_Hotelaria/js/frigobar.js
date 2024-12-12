// Recupera os dados de hóspedes e frigobar do localStorage, ou inicializa se não existirem
let hospedes = JSON.parse(localStorage.getItem('hospedes')) || [];
let frigobar = JSON.parse(localStorage.getItem('frigobar')) || [];

// Inicializa o frigobar para novos hóspedes
hospedes.forEach(hospede => {
    if (!frigobar.some(f => f.nome === hospede.nome)) {
        frigobar.push({ nome: hospede.nome, precoTotal: 0 });
    }
});
localStorage.setItem('frigobar', JSON.stringify(frigobar));

// Preenche a lista de hóspedes no select
const selectHospede = document.getElementById('listaHospedes');
hospedes.forEach(hospede => {
    const option = document.createElement('option');
    option.value = hospede.nome;
    option.textContent = hospede.nome;
    selectHospede.appendChild(option);
});

// Configura o evento de submissão do formulário
document.getElementById('form-frigobar').addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Recupera os valores do formulário
    const hospedeSelecionado = selectHospede.value;
    const itemConsumido = document.getElementById('item-frigobar').value;
    const quantidade = parseInt(document.getElementById('quantidade-frigobar').value, 10);

    // Valida a quantidade
    if (isNaN(quantidade) || quantidade <= 0) {
        alert("Por favor, insira uma quantidade válida.");
        return;
    }

    // Calcula o valor final do consumo
    const valorFinal = calcularPrecoFinalFrigobar(itemConsumido, quantidade);
    if (valorFinal === "ERRO") {
        alert(`Item "${itemConsumido}" não está disponível no frigobar.`);
        return;
    }

    // Encontra o registro do hóspede no frigobar
    const hospede = frigobar.find(h => h.nome === hospedeSelecionado);
    if (!hospede) {
        alert(`Hóspede "${hospedeSelecionado}" não encontrado no sistema.`);
        return;
    }

    // Atualiza o total do frigobar para o hóspede
    hospede.precoTotal += valorFinal;

    // Atualiza a mensagem e o localStorage
    document.getElementById('mensagem-frigobar').innerText = 
        `Registro de consumo: ${quantidade} ${itemConsumido}(s) para ${hospedeSelecionado}. Conta: R$${valorFinal.toFixed(2)}`;
    localStorage.setItem('frigobar', JSON.stringify(frigobar));
});

// Tabela de preços dos itens do frigobar
const precosConverter = {
    "cerveja": 8.00,
    "refrigerante": 5.00,
    "água": 3.00,
    "suco": 6.00,
    "snack": 4.00,
    "chocolate": 7.00,
    "energético": 10.00,
    "iogurte": 5.00,
    "sanduíche": 12.00,
    "água(s) saborizada": 6.00
};

// Função para calcular o preço final do consumo
function calcularPrecoFinalFrigobar(itemConsumido, quantidade) {
    if (precosConverter[itemConsumido] !== undefined) {
        return precosConverter[itemConsumido] * quantidade;
    } else {
        return "ERRO";
    }
}

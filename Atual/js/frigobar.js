// Recupera os dados de hóspedes e consumos de frigobar do localStorage ou inicializa arrays vazios caso não existam
let hospedes = JSON.parse(localStorage.getItem('hospedes')) || []; // Lista de hóspedes cadastrados
let frigobar = JSON.parse(localStorage.getItem('frigobar')) || []; // Dados de consumo de frigobar para cada hóspede

// Inicializa o frigobar para novos hóspedes
hospedes.forEach(hospede => {
    // Verifica se o hóspede já tem um registro no frigobar
    if (!frigobar.some(f => f.nome === hospede.nome)) {
        frigobar.push({ nome: hospede.nome, precoTotal: 0 }); // Cria um registro inicial com preço total igual a zero
    }
});
// Atualiza o localStorage com os dados do frigobar inicializados
localStorage.setItem('frigobar', JSON.stringify(frigobar));

// Preenche a lista de hóspedes no elemento <select>
const selectHospede = document.getElementById('listaHospedes'); // Referência ao dropdown para selecionar hóspedes
hospedes.forEach(hospede => {
    const option = document.createElement('option'); // Cria um elemento <option>
    option.value = hospede.nome; // Define o nome do hóspede como valor da opção
    option.textContent = hospede.nome; // Define o nome do hóspede como texto visível
    selectHospede.appendChild(option); // Adiciona a opção ao dropdown
});

// Configura o evento de submissão do formulário de consumo do frigobar
document.getElementById('form-frigobar').addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o comportamento padrão de recarregar a página ao enviar o formulário

    // Recupera os valores do formulário
    const hospedeSelecionado = selectHospede.value; // Nome do hóspede selecionado
    const itemConsumido = document.getElementById('item-frigobar').value; // Item consumido
    const quantidade = parseInt(document.getElementById('quantidade-frigobar').value, 10); // Quantidade consumida

    // Valida a quantidade fornecida
    if (isNaN(quantidade) || quantidade <= 0) { // Verifica se a quantidade é um número válido e maior que zero
        alert("Por favor, insira uma quantidade válida."); // Exibe um alerta em caso de erro
        return; // Encerra a execução da função
    }

    // Calcula o valor total do consumo com base no item e na quantidade
    const valorFinal = calcularPrecoFinalFrigobar(itemConsumido, quantidade);
    if (valorFinal === "ERRO") { // Verifica se o item é válido
        alert(`Item "${itemConsumido}" não está disponível no frigobar.`); // Alerta caso o item não seja encontrado
        return; // Encerra a execução da função
    }

    // Encontra o registro do hóspede correspondente no frigobar
    const hospede = frigobar.find(h => h.nome === hospedeSelecionado);
    if (!hospede) { // Verifica se o hóspede foi encontrado
        alert(`Hóspede "${hospedeSelecionado}" não encontrado no sistema.`); // Alerta caso o hóspede não exista
        return; // Encerra a execução da função
    }

    // Atualiza o total do consumo do hóspede no frigobar
    hospede.precoTotal += valorFinal;

    // Atualiza a mensagem de registro de consumo no HTML
    document.getElementById('mensagem-frigobar').innerText = 
        `Registro de consumo: ${quantidade} ${itemConsumido}(s) para ${hospedeSelecionado}. Conta: R$${valorFinal.toFixed(2)}`;
    
    // Salva os dados atualizados no localStorage
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

// Função para calcular o preço total com base no item e na quantidade
function calcularPrecoFinalFrigobar(itemConsumido, quantidade) {
    if (precosConverter[itemConsumido] !== undefined) { // Verifica se o item está na tabela de preços
        return precosConverter[itemConsumido] * quantidade; // Retorna o preço total do consumo
    } else {
        return "ERRO"; // Retorna "ERRO" se o item não for encontrado
    }
}

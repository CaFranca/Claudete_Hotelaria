let hospedes = JSON.parse(localStorage.getItem('hospedes')) || [];

const selectHospede = document.getElementById('listaHospedes');

hospedes.forEach(hospede => {
    const option = document.createElement('option');
    option.value = hospede.documento
    option.textContent = hospede.nome
    selectHospede.appendChild(option)
});

document.getElementById('form-frigobar').addEventListener('submit', (event) => {
    event.preventDefault();
    const selectHospede = document.getElementById('listaHospedes')
    const hospedeSelecionado = selectHospede.options[selectHospede.selectedIndex].text
    const itemConsumido = document.getElementById('item-frigobar').value
    const quantidade = document.getElementById('quantidade-frigobar').value
    let preco = calcularPrecoFrigobar(itemConsumido)
    let valor_final = (preco*quantidade).toFixed(2)
    document.getElementById('mensagem-frigobar').innerText = `Registro de consumo: ${quantidade} ${itemConsumido}(s) para ${hospedeSelecionado}. Conta: R$${valor_final}`
});

function calcularPrecoFrigobar(itemConsumido){
    let preco = 0
    switch(itemConsumido){
        case "cerveja":
            preco = 8.00
            break;
        case "refrigerante":
            preco = 5.00
            break;
        case "água":
            preco = 3.00
            break;
        case "suco":
            preco = 6.00
            break;
        case "snack":
            preco = 4.00
            break;
        case "chocolate":
            preco = 7.00
            break;
        case "energético":
            preco = 10.00
            break;
        case "iogurte":
            preco = 5.00
            break;
        case "sanduíche":
            preco = 12.00
            break;
        case "água(s) saborizada":
            preco = 6.00
            break;
    }
    return preco
}
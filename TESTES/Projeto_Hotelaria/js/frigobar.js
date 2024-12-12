let hospedes = JSON.parse(localStorage.getItem('hospedes')) || [];
let frigobar = JSON.parse(localStorage.getItem('frigobar')) || [];

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
    let valor_final = calcularPrecoFinalFrigobar(itemConsumido,quantidade)
    document.getElementById('mensagem-frigobar').innerText = `Registro de consumo: ${quantidade} ${itemConsumido}(s) para ${hospedeSelecionado}. Conta: R$${valor_final.toFixed(2)}`  
    if (frigobar[selectHospede.selectedIndex].items[itemConsumido] === undefined) {
        frigobar[selectHospede.selectedIndex].items[itemConsumido] = parseInt(quantidade)
    } else {
        frigobar[selectHospede.selectedIndex].items[itemConsumido] += parseInt(quantidade)
    }
    frigobar[selectHospede.selectedIndex].precoTotal += valor_final
    localStorage.setItem('frigobar', JSON.stringify(frigobar))
});

// Switch Case Simplificado
const precosConverter = {
    "cerveja":8.00,
    "refrigerante":5.00,
    "água":3.00,
    "suco":6.00,
    "snack":4.00,
    "chocolate":7.00,
    "energético":10.00,
    "iogurte":5.00,
    "sanduíche":12.00,
    "água(s) saborizada":6.00
}

function calcularPrecoFinalFrigobar(itemConsumido, quantidade){
    try {
        return (precosConverter[itemConsumido]*quantidade)
    } catch (error) {
        return "ERRO"
    }
}
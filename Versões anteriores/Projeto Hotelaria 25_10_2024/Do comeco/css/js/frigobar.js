document.getElementById('form-frigobar').addEventListener('submit', (event) => {
    event.preventDefault();
    const hospedeNome = document.getElementById('hospede-frigobar').value;
    const itemConsumido = document.getElementById('item-frigobar').value;
    const quantidade = document.getElementById('quantidade-frigobar').value;

    // Aqui você pode adicionar a lógica para registrar o consumo
    document.getElementById('mensagem-frigobar').innerText = `Registro de consumo: ${quantidade} ${itemConsumido} para ${hospedeNome}.`;
});

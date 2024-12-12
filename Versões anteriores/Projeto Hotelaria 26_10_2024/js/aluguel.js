document.getElementById('form-aluguel').addEventListener('submit', (event) => {
    event.preventDefault();
    const hospedeNome = document.getElementById('hospede-aluguel').value;
    const quartoNumero = document.getElementById('quarto-aluguel').value;

    // Aqui você pode adicionar a lógica para alugar um quarto
    document.getElementById('mensagem-aluguel').innerText = `Quarto ${quartoNumero} alugado para ${hospedeNome}.`;
});

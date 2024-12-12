document.getElementById('form-servicos').addEventListener('submit', (event) => {
    event.preventDefault();
    const hospedeNome = document.getElementById('hospede-servico').value;
    const servicoSelecionado = document.getElementById('servico').value;

    // Aqui você pode adicionar a lógica para solicitar um serviço
    document.getElementById('mensagem-servico').innerText = `Serviço ${servicoSelecionado} solicitado para ${hospedeNome}.`;
});

// Recupera os hóspedes do localStorage
let hospedes = JSON.parse(localStorage.getItem('hospedes')) || [];

// Preenche a lista de hóspedes no select
const hospedeSelect = document.getElementById('hospede-servico');
hospedes.forEach(hospede => {
    const option = document.createElement('option');
    option.value = hospede.nome; // Usa o nome do hóspede
    option.textContent = hospede.nome;
    hospedeSelect.appendChild(option);
});

// Adiciona evento de submissão do formulário
document.getElementById('form-servicos').addEventListener('submit', (event) => {
    event.preventDefault();
    const hospedeNome = hospedeSelect.value;
    const servicoSelecionado = document.getElementById('servico').value;

    // Aqui você pode adicionar a lógica para solicitar um serviço
    document.getElementById('mensagem-servico').innerText = `Serviço ${servicoSelecionado} solicitado para ${hospedeNome}.`;
});

document.getElementById('form-checkout').addEventListener('submit', (event) => {
    event.preventDefault();
    const hospedeNome = document.getElementById('hospede-checkout').value;

    // Aqui você pode adicionar a lógica para iniciar o check-out
    document.getElementById('mensagem-checkout').innerText = `Check-out iniciado para ${hospedeNome}.`;
    
    // Exibir detalhes da conta (exemplo)
    document.getElementById('detalhes-checkout').style.display = 'block';
    document.getElementById('detalhes-checkout-conta').innerText = `Conta de ${hospedeNome}: R$ 200,00 (exemplo).`;
});

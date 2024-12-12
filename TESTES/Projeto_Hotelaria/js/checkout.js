let hospedes = JSON.parse(localStorage.getItem('hospedes')) || [];
let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
let frigobar = JSON.parse(localStorage.getItem('frigobar')) || [];
const mensagemCheckout = document.getElementById('mensagem-checkout');
const detalhesCheckout = document.getElementById('detalhes-checkout');
const detalhesCheckoutConta = document.getElementById('detalhes-checkout-conta');
const formCheckout = document.getElementById('form-checkout');
const listaHospedes = document.getElementById('listaHospedes');
const pagarCheckoutButton = document.getElementById('pagar-checkout');

// Preenche o select com os hóspedes
hospedes.forEach(hospede => {
    const option = document.createElement('option');
    option.value = hospede.documento;
    option.textContent = hospede.nome;
    listaHospedes.appendChild(option);
});

// Evento de envio do formulário de check-out
formCheckout.addEventListener('submit', (event) => {
    event.preventDefault();

    // Obtém o hóspede selecionado
    const hospedeSelecionado = listaHospedes.value;
    const hospede = hospedes.find(h => h.documento === hospedeSelecionado);

    if (!hospede) {
        mensagemCheckout.innerText = 'Hóspede não encontrado.';
        return;
    }

    // Calcula o total da conta (exemplo fictício, você pode substituir pelo cálculo real)
    detalhesCheckout.style.display = 'block';
    detalhesCheckoutConta.innerText = `Conta de ${hospede.nome}.`;

    // Define o evento de pagamento
    pagarCheckoutButton.onclick = () => {
        // Apaga as reservas e frigobar relacionados ao hóspede
        reservas = reservas.filter(reserva => reserva.documentoHospede !== hospede.documento);
        frigobar = frigobar.filter(item => item.documentoHospede !== hospede.documento);  
    
        // Atualiza o localStorage
        localStorage.setItem('reservas', JSON.stringify(reservas));
        localStorage.setItem('frigobar', JSON.stringify(frigobar));

        // Exibe a mensagem de sucesso no pagamento
        mensagemCheckout.innerText = `Sua conta foi paga. Check-out realizado com sucesso.`;

        // Oculta os detalhes de pagamento após o check-out
        detalhesCheckout.style.display = 'none';

        // Limpa o campo de seleção de hóspede e reseta o formulário
        listaHospedes.value = '';
        formCheckout.reset();
    };
});

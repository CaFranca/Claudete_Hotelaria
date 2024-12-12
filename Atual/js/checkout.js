// Recupera os dados do localStorage ou inicializa como arrays vazios caso não existam
let hospedes = JSON.parse(localStorage.getItem('hospedes')) || []; // Carrega os hóspedes previamente cadastrados
let reservas = JSON.parse(localStorage.getItem('reservas')) || []; // Carrega as reservas ativas
let frigobar = JSON.parse(localStorage.getItem('frigobar')) || []; // Carrega os consumos de frigobar

// Referências aos elementos HTML para exibição de mensagens e interação com o usuário
const mensagemCheckout = document.getElementById('mensagem-checkout'); // Exibe mensagens durante o processo de checkout
const detalhesCheckout = document.getElementById('detalhes-checkout'); // Seção que exibe detalhes do checkout
const detalhesCheckoutConta = document.getElementById('detalhes-checkout-conta'); // Detalhes específicos da conta do hóspede
const formCheckout = document.getElementById('form-checkout'); // Formulário de checkout
const listaHospedes = document.getElementById('listaHospedes'); // Dropdown (select) com os hóspedes
const pagarCheckoutButton = document.getElementById('pagar-checkout'); // Botão para finalizar o pagamento e o checkout

// Preenche o dropdown com os nomes dos hóspedes cadastrados
hospedes.forEach(hospede => {
    const option = document.createElement('option'); // Cria um elemento <option>
    option.value = hospede.documento; // Define o documento do hóspede como o valor da opção
    option.textContent = hospede.nome; // Define o nome do hóspede como o texto visível da opção
    listaHospedes.appendChild(option); // Adiciona a opção ao <select> de hóspedes
});

// Adiciona um evento de envio ao formulário de checkout
formCheckout.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o comportamento padrão de recarregar a página ao enviar o formulário

    // Obtém o documento do hóspede selecionado no <select>
    const hospedeSelecionado = listaHospedes.value;
    const hospede = hospedes.find(h => h.documento === hospedeSelecionado); // Busca o hóspede correspondente no array de hóspedes

    if (!hospede) { // Verifica se o hóspede foi encontrado
        mensagemCheckout.innerText = 'Hóspede não encontrado.'; // Exibe uma mensagem de erro caso não seja encontrado
        return; // Encerra a execução da função
    }

    // Exibe os detalhes do checkout para o hóspede selecionado
    detalhesCheckout.style.display = 'block'; // Torna visível a seção de detalhes do checkout
    detalhesCheckoutConta.innerText = `Conta de ${hospede.nome}.`; // Exibe o nome do hóspede na seção de conta

    // Define o evento para finalizar o pagamento e o checkout
    pagarCheckoutButton.onclick = () => {
        // Remove as reservas e consumos do frigobar associados ao hóspede
        reservas = reservas.filter(reserva => reserva.documentoHospede !== hospede.documento); // Filtra reservas não relacionadas ao hóspede
        frigobar = frigobar.filter(item => item.documentoHospede !== hospede.documento); // Filtra itens do frigobar não relacionados ao hóspede
    
        // Atualiza os dados no localStorage
        localStorage.setItem('reservas', JSON.stringify(reservas)); // Salva o estado atualizado das reservas
        localStorage.setItem('frigobar', JSON.stringify(frigobar)); // Salva o estado atualizado do frigobar

        // Exibe uma mensagem de sucesso no processo de checkout
        mensagemCheckout.innerText = `Sua conta foi paga. Check-out realizado com sucesso.`;

        // Oculta os detalhes do checkout após a finalização
        detalhesCheckout.style.display = 'none';

        // Limpa o campo de seleção e reseta o formulário
        listaHospedes.value = ''; // Reseta o valor do dropdown para o estado inicial
        formCheckout.reset(); // Limpa todos os campos do formulário
    };
});

// Referências aos botões e mensagem
const botaoAdicionarTeste = document.getElementById('adicionar-hospede-teste');
const botaoLimparLocalStorage = document.getElementById('limpar-localstorage');
const mensagemAdmin = document.getElementById('mensagem-admin');

// Função para adicionar um hóspede de teste
botaoAdicionarTeste.addEventListener('click', () => {
    let hospedes = JSON.parse(localStorage.getItem('hospedes')) || [];
    let frigobar = JSON.parse(localStorage.getItem('frigobar')) || [];

    // Adiciona um hóspede de teste
    const hospedeTeste = {
        nome: `Dummy ${hospedes.length + 1}`,
        documento: `TESTE${hospedes.length + 1}`,
        endereco: `Endereço Teste ${hospedes.length + 1}`,
        contato: `99999999${hospedes.length + 1}`
    };

    const novoFrigo = {
        items: {},
        precoTotal: 0
    }

    frigobar.push(novoFrigo);
    hospedes.push(hospedeTeste);
    localStorage.setItem('hospedes', JSON.stringify(hospedes));
    localStorage.setItem('frigobar', JSON.stringify(frigobar));

    mensagemAdmin.innerText = `Hóspede de teste "${hospedeTeste.nome}" adicionado com sucesso!`;
});

// Função para limpar o localStorage
botaoLimparLocalStorage.addEventListener('click', () => {
    localStorage.clear();
    mensagemAdmin.innerText = 'Local Storage limpo com sucesso!';
});

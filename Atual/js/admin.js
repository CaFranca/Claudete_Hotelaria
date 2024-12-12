// referências aos botões e mensagem no html
const botaoAdicionarTeste = document.getElementById('adicionar-hospede-teste');
const botaoLimparLocalStorage = document.getElementById('limpar-localstorage');
const mensagemAdmin = document.getElementById('mensagem-admin');

// função arrow para adicionar um hóspede de teste
botaoAdicionarTeste.addEventListener('click', () => {
    let hospedes = JSON.parse(localStorage.getItem('hospedes')) || [];

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

    mensagemAdmin.innerText = `Hóspede de teste "${hospedeTeste.nome}" adicionado com sucesso!`;
});

// função arrow para limpar o localStorage
botaoLimparLocalStorage.addEventListener('click', () => {
    localStorage.clear();
    
    mensagemAdmin.innerText = 'Local Storage limpo com sucesso!';
});

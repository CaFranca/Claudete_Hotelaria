// Classe para representar um hóspede
class Hospede {
    constructor(nome, documento, endereco, contato) {
        this.nome = nome;
        this.documento = documento;
        this.endereco = endereco;
        this.contato = contato;
    }

    // Método estático para validar os dados de um hóspede
    static validarDados(nome, documento, endereco, contato) {
        return nome && documento && endereco && contato;
    }
}

// Classe para gerenciar a lista de hóspedes
class GerenciadorHospedes {
    constructor() {
        this.hospedes = JSON.parse(localStorage.getItem('hospedes')) || [];
    }

    // Adiciona ou atualiza um hóspede
    adicionarOuAtualizarHospede(nome, documento, endereco, contato) {
        const hospedeIndex = this.hospedes.findIndex(h => h.documento === documento);

        if (hospedeIndex >= 0) {
            // Atualiza o hóspede existente
            this.hospedes[hospedeIndex] = new Hospede(nome, documento, endereco, contato);
            this.salvarDados();
            return 'Informações do hóspede atualizadas.';
        } else {
            // Adiciona um novo hóspede
            this.hospedes.push(new Hospede(nome, documento, endereco, contato));
            this.salvarDados();
            return 'Hóspede cadastrado com sucesso.';
        }
    }

    // Carrega um hóspede para edição
    carregarHospedeParaEdicao(documento) {
        return this.hospedes.find(h => h.documento === documento) || null;
    }

    // Salva os hóspedes no localStorage
    salvarDados() {
        localStorage.setItem('hospedes', JSON.stringify(this.hospedes));
    }
}

// Inicializa o gerenciador de hóspedes
const gerenciador = new GerenciadorHospedes();

// Adiciona um ouvinte de evento ao formulário de cadastro
document.getElementById('form-hospedes').addEventListener('submit', (event) => {
    event.preventDefault(); // Previne a recarga da página

    // Obtém os valores dos campos do formulário
    const nome = document.getElementById('nome').value.trim();
    const documento = document.getElementById('documento').value.trim();
    const endereco = document.getElementById('endereco').value.trim();
    const contato = document.getElementById('contato').value.trim();

    // Verifica se os dados são válidos
    if (!Hospede.validarDados(nome, documento, endereco, contato)) {
        document.getElementById('mensagem-hospede').innerText = 'Por favor, preencha todos os campos.';
        return;
    }

    // Adiciona ou atualiza o hóspede
    const mensagem = gerenciador.adicionarOuAtualizarHospede(nome, documento, endereco, contato);
    document.getElementById('mensagem-hospede').innerText = mensagem;

    // Limpa os campos do formulário após o envio
    document.getElementById('form-hospedes').reset();
});

// Função para carregar dados de um hóspede para edição
function carregarHospedeParaEdicao(documento) {
    const hospede = gerenciador.carregarHospedeParaEdicao(documento);

    if (hospede) {
        document.getElementById('nome').value = hospede.nome;
        document.getElementById('documento').value = hospede.documento;
        document.getElementById('endereco').value = hospede.endereco;
        document.getElementById('contato').value = hospede.contato;
        document.getElementById('mensagem-hospede').innerText = 'Edite as informações e clique em "Cadastrar/Atualizar Hóspede".';
    }
}

// Carrega o hóspede para edição ao carregar a página, se necessário
document.addEventListener('DOMContentLoaded', () => {
    const documentoEditar = localStorage.getItem('hospedeEditar');
    if (documentoEditar) {
        carregarHospedeParaEdicao(documentoEditar);
        localStorage.removeItem('hospedeEditar');
    }
});

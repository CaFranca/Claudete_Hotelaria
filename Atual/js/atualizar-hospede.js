// Inicializa os valores necessários ao longo do código
let hospedes = JSON.parse(localStorage.getItem('hospedes')) || []; // Recupera a lista de hóspedes do localStorage ou inicializa como um array vazio
let logging = JSON.parse(localStorage.getItem('logging')) || []; // Recupera o histórico de logs do localStorage ou inicializa como um array vazio

// Referências aos elementos do formulário e da interface
const formAtualizacao = document.getElementById('form-atualizacao-hospedes'); // Formulário para atualizar hóspedes
const listaHospedes = document.getElementById('lista-hospedes'); // Dropdown (select) para selecionar hóspedes
const mensagemHospede = document.getElementById('mensagem-hospede'); // Elemento para exibir mensagens ao usuário

// Atualiza a lista de hóspedes no dropdown
function atualizarListaHospedes() {
  // Reseta a lista e adiciona a opção padrão "Selecione um hóspede"
  listaHospedes.innerHTML = `<option value="" selected disabled>Selecione um hóspede</option>`;
  hospedes.forEach(hospede => {
    // Adiciona cada hóspede como uma opção no dropdown
    listaHospedes.innerHTML += `<option value="${hospede.documento}">${hospede.nome}</option>`;
  });
}

// Limpa os campos do formulário
function limparCampos() {
  listaHospedes.value = ''; // Reseta a seleção no dropdown
  document.getElementById('nome').value = ''; // Limpa o campo de nome
  document.getElementById('documento').value = ''; // Limpa o campo de documento
  document.getElementById('endereco').value = ''; // Limpa o campo de endereço
  document.getElementById('contato').value = ''; // Limpa o campo de contato
}

// Preenche os campos do formulário com os dados do hóspede selecionado
function preencherCampos(hospede) {
  document.getElementById('nome').value = hospede.nome; // Define o nome no campo de entrada
  document.getElementById('documento').value = hospede.documento; // Define o documento no campo de entrada
  document.getElementById('endereco').value = hospede.endereco; // Define o endereço no campo de entrada
  document.getElementById('contato').value = hospede.contato; // Define o contato no campo de entrada
}

// Evento: Atualiza o formulário com os dados do hóspede selecionado no dropdown
listaHospedes.addEventListener('change', () => {
  const documentoSelecionado = listaHospedes.value; // Obtém o valor do documento selecionado
  if (!documentoSelecionado) { // Se nenhum hóspede foi selecionado
    limparCampos(); // Limpa os campos do formulário
    return; // Encerra a função
  }

  // Busca o hóspede correspondente pelo documento
  const hospede = hospedes.find(hosp => hosp.documento === documentoSelecionado);
  if (hospede) {
    preencherCampos(hospede); // Preenche os campos com os dados do hóspede
  }
});

// Evento: Atualiza os dados do hóspede ao submeter o formulário
formAtualizacao.addEventListener('submit', (event) => {
  event.preventDefault(); // Evita o recarregamento da página

  const documentoSelecionado = listaHospedes.value; // Obtém o hóspede selecionado no dropdown
  if (!documentoSelecionado) { // Se nenhum hóspede foi selecionado
    mensagemHospede.innerText = 'Por favor, selecione um hóspede para atualizar.';
    return; // Encerra a função
  }

  // Busca o índice do hóspede correspondente
  const hospedeIndex = hospedes.findIndex(hosp => hosp.documento === documentoSelecionado);
  if (hospedeIndex >= 0) {
    const hospede = hospedes[hospedeIndex]; // Recupera o hóspede pelo índice

    // Obtém os novos valores dos campos do formulário
    const nome = document.getElementById('nome').value.trim();
    const documento = document.getElementById('documento').value.trim();
    const endereco = document.getElementById('endereco').value.trim();
    const contato = document.getElementById('contato').value.trim();

    if (!nome || !documento || !endereco || !contato) { // Verifica se algum campo está vazio
      mensagemHospede.innerText = 'Há campos vazios. Por favor, preencha todos os campos.';
      return; // Encerra a função
    }

    // Atualiza os dados do hóspede
    hospede.nome = nome;
    hospede.documento = documento;
    hospede.endereco = endereco;
    hospede.contato = contato;

    // Salva as alterações no localStorage
    localStorage.setItem('hospedes', JSON.stringify(hospedes));
    logging.push(`Hóspede ${hospede.nome} atualizado às ${new Date().toLocaleString()}`); // Log da atualização
    localStorage.setItem('logging', JSON.stringify(logging));

    // Atualiza a lista de hóspedes e limpa os campos
    atualizarListaHospedes();
    limparCampos();
    mensagemHospede.innerText = 'Hóspede atualizado com sucesso!';
  } else {
    mensagemHospede.innerText = 'Erro: Hóspede não encontrado.';
  }
});

// Inicializa a lista de hóspedes no carregamento da página
atualizarListaHospedes();

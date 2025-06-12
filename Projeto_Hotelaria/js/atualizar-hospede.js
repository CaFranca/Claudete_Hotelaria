// Inicializa os valores que precisaremos durante o código 
let hospedes = JSON.parse(localStorage.getItem('hospedes')) || []
const formAtualizacao = document.getElementById('form-atualizacao-hospedes')
const listaHospedes = document.getElementById('lista-hospedes')
const mensagemHospede = document.getElementById('mensagem-hospede')

// Atualiza a lista de hóspedes no select. Essa função é necessária para, após a atualização, o nome do hóspede mudar na lista
function atualizarListaHospedes() {
  listaHospedes.innerHTML = `<option value="" selected disabled>Selecione um hóspede</option>` // Limpa e adiciona a opção padrão
  hospedes.forEach(hospede => {
    listaHospedes.innerHTML += `<option value="${hospede.documento}">${hospede.nome}</option>` // Adiciona os hóspedes como itens do select, sendo que o documento é o valor da opção
  });
}

// Limpa os campos do formulário. Utilizada após a pessoa clicar em "Atualizar Hóspede".
function limparCampos() {
  listaHospedes.value = '';
  document.getElementById('nome').value = ''
  document.getElementById('documento').value = ''
  document.getElementById('endereco').value = ''
  document.getElementById('contato').value = ''
}

// Atualiza os campos do formulário com os dados do hóspede selecionado
function preencherCampos(hospede) {
  document.getElementById('nome').value = hospede.nome
  document.getElementById('documento').value = hospede.documento
  document.getElementById('endereco').value = hospede.endereco
  document.getElementById('contato').value = hospede.contato
}

// Reseta o formulário ao selecionar a opção vazia
listaHospedes.addEventListener('change', () => { // Dispara toda vez que o usuário muda a seleção no <select>
  const documentoSelecionado = listaHospedes.value // Pega o valor da opção selecionada no <select> (o hóspede nesse caso)
  if (!documentoSelecionado) { // Verifica se o documento (como RG, que serve como identificador único) não é vazio.
    limparCampos() // Se for vazio, limpa os campos
    return // Para a função
  }

  const hospede = hospedes.find(hosp => hosp.documento === documentoSelecionado) // Busca o hóspede do array de hóspedes declarado na primeira linha. Ele busca com base no documento, que serve como ID.
  if (hospede) { // Se o hóspede existir
    preencherCampos(hospede); // Chama a função preencherCampos. Que preenche o formulário com os valores do hóspede.
  }
});

// Atualiza os dados do hóspede no localStorage
formAtualizacao.addEventListener('submit', (event) => { // Dispara quando o formulário for enviado.
  event.preventDefault() // Evita que a página recarregue.

  const documentoSelecionado = listaHospedes.value // Obtém o valor do hóspede selecionado na lista
  if (!documentoSelecionado) { // Se o documento for vazio, nenhum hóspede foi selecionado
    mensagemHospede.innerText = 'Por favor, selecione um hóspede para atualizar.'; 
    return;
  }

  // Encontra o índice do hóspede selecionado
  const hospedeIndex = hospedes.findIndex(hosp => hosp.documento === documentoSelecionado); // Busca o índice do hóspede do array de hóspedes declarado na primeira linha. Ele busca com base no documento, que serve como ID.

  if (hospedeIndex >= 0) { // Se o index for maior igual que zero (válido), o resto do código é feito.
    const hospede = hospedes[hospedeIndex]; // Pega o hóspede à patir do Index e da lista.

    // Inicializa as variáveis do hóspede.
    const nome = document.getElementById('nome').value.trim();
    const documento = document.getElementById('documento').value.trim();
    const endereco = document.getElementById('endereco').value.trim();
    const contato = document.getElementById('contato').value.trim();

    if (!nome || !documento || !endereco || !contato) { // Verifica se algum dos campos é vazio.
      mensagemHospede.innerText = 'Há campos vazios. Por favor, preencha todos os campos.';
      return; // Encerra a função, não atualizando o hóspede.
    }

    // Atualiza os dados do hóspede com os valores do formulário
    hospede.nome = nome;
    hospede.documento = documento;
    hospede.endereco = endereco;
    hospede.contato = contato;

    // Salva as alterações no localStorage
    localStorage.setItem('hospedes', JSON.stringify(hospedes));
    mensagemHospede.innerText = 'Hóspede atualizado com sucesso!';
    
    // Atualiza a lista de hóspedes e limpa os campos
    atualizarListaHospedes();
    limparCampos();
  } 
  else { // Index inválido
    mensagemHospede.innerText = 'Erro: Hóspede não encontrado.';
  }
});

// Inicializa a lista de hóspedes
atualizarListaHospedes();

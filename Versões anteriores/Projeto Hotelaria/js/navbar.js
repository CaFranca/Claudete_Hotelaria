// Script para carregar o conteúdo do navbar

fetch('navbar.html')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.text();
  })
  .then(data => {
    document.getElementById('navbar').innerHTML = data;
  })
  .catch(error => {
    console.error('Erro ao carregar o navbar:', error);
  });
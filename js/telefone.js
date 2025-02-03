function mascara(input, masc) {
  setTimeout(() => {
    input.value = masc(input.value);
  }, 1);
}

/* Mascara Telefone */
function mascaraTelefone(valor) {
  valor = valor.replace(/\D/g, ""); // Remove tudo o que não é dígito
  valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2"); // Coloca parênteses em volta dos dois primeiros dígitos
  valor = valor.replace(/(\d)(\d{4})$/, "$1-$2"); // Coloca hífen entre o quarto e o quinto dígitos
  return valor;
}

function atualizaTelefone({ target }) {
  mascara(target, mascaraTelefone);
}

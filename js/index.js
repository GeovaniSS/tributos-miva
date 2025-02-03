function copiarCnpj() {
  const cnpj = document.getElementById("cpnj").textContent;
  const cpnjSemFormatacao = cnpj.replace(/\D/g, "");
  navigator.clipboard.writeText(cpnjSemFormatacao);
}

function imprimirEnvelope() {
  window.print();
}

function alternarVisibilidade(e) {
  const elemento = e.target.parentElement.querySelector("input");

  if (elemento.type == "password") {
    elemento.type = "text";
  } else {
    elemento.type = "password";
  }
}

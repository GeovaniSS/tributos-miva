function login(e) {
  e.preventDefault();
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  if (usuario === "" || senha === "") {
    return alert("Digite o usuário e a senha");
  }

  if (senha === "miva12") {
    manterLogin();
    window.open("envelope.html", "_self");
  } else {
    alert("Usuário ou senha inválidos");
  }
}

function manterLogin() {
  localStorage.setItem("@miva/manterConectado", "true");
}

function verificarLogin() {
  const logado = localStorage.getItem("@miva/manterConectado") === "true";
  const paginaAtual = window.location.pathname.split("/").pop();
  const isPaginaLogin = paginaAtual === "" || paginaAtual === "index.html";

  if (logado && isPaginaLogin) {
    return window.open("envelope.html", "_self");
  } else if (!logado && !isPaginaLogin) {
    return window.open("index.html", "_self");
  }
}

verificarLogin();

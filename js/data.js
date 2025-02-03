let dataElements;
let dataElementVisible;

function formatarData(data) {
  const day = data.getDate().toString().padStart(2, "0");
  const month = (data.getMonth() + 1).toString().padStart(2, "0");
  const year = data.getFullYear();

  return `${day}/${month}/${year}`;
}

function mascaraData(data) {
  let dataFormatada = "";

  if (data.length > 2) {
    dataFormatada = data.slice(0, 2) + "/";
    if (data.length > 4) {
      dataFormatada += data.slice(2, 4) + "/";
      dataFormatada += data.slice(4, 8);
    } else {
      dataFormatada += data.slice(2);
    }
  } else {
    dataFormatada = data;
  }

  return dataFormatada;
}

function inicializaData() {
  dataElements = document.getElementsByName("data");
  dataElementVisible = [...document.getElementsByName("data")].find((el) => {
    return window.getComputedStyle(el).display !== "none";
  });
  dataElements.forEach((dataEl) => {
    dataEl.value = formatarData(new Date());
  });
}

function atualizarData({ target }) {
  const data = target.value.replace(/\D/g, "");
  target.value = mascaraData(data);

  dataElementVisible.addEventListener("change", ({ target }) => {
    dataElements.forEach((dataEl) => {
      dataEl.value = target.value;
    });
  });
}

function limparData(event) {
  if (event.key === "Backspace") {
    event.target.value = "";
  }
}

inicializaData();

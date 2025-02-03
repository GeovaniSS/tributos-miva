let remuneracaoEl;
let primiciaEl;
let dizimoEl;
let ofertaMinisterioSocorroEl;
let ofertaGratidaoEl;
let semeaduraEl;
let ofertaIsraelEl;
let totalContribuicaoEl;

function inicializa() {
  remuneracaoEl = [...document.getElementsByName("remuneracao")].find((el) => {
    return window.getComputedStyle(el).display !== "none";
  });
  primiciaEl = document.getElementById("primicia");
  dizimoEl = document.getElementById("dizimo");
  ofertaMinisterioSocorroEl = document.getElementById("oferta_minis_socorro");
  ofertaGratidaoEl = document.getElementById("oferta_gratidao");
  semeaduraEl = document.getElementById("semeadura");
  ofertaIsraelEl = document.getElementById("oferta_israel");
  totalContribuicaoEl = [
    ...document.getElementsByName("total-contribuicao"),
  ].find((el) => {
    return window.getComputedStyle(el).display !== "none";
  });
}

function calcula({ target }, total = false) {
  inicializa();
  target.value = formatarValor(target.value);
  total ? calculaTotalContribuicao() : calculaTributos();
}

function formatarNumero(numero) {
  return Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numero);
}

function formatarValor(valor) {
  if (typeof valor === "string") {
    valor = valor.replace(/\D/g, "");
  }

  if (valor === "") {
    return "0,00";
  }

  const numeroFormatado = parseFloat(valor) / 100;

  return formatarNumero(numeroFormatado);
}

function valorCalculavel(valor) {
  return parseFloat(valor.replace(/[R$\s.]/g, "").replace(",", ".")) || 0;
}

function calculaContribuicao(valor, percentual) {
  return Math.ceil(parseFloat(valor) * (percentual / 100));
}

function calculaPrimicia(remuneracao) {
  const primicia = calculaContribuicao(remuneracao, 100 / 30);
  primiciaEl.value = formatarNumero(primicia);
  return valorCalculavel(primiciaEl.value);
}

function calculaDizimo(remuneracao, primicia) {
  const dizimo = calculaContribuicao(remuneracao - primicia, 10);
  dizimoEl.value = formatarNumero(dizimo);
  return valorCalculavel(dizimoEl.value);
}

function calculaOfertas(remuneracao) {
  const taxas = {
    ofertaMinisterioSocorro: 1,
    ofertaGratidao: 0.1,
    semeadura: 0.4,
    ofertaIsrael: 0.8,
  };
  const ofertaMinisterioSocorro = calculaContribuicao(
    remuneracao,
    taxas.ofertaMinisterioSocorro
  );
  const ofertaGratidao = calculaContribuicao(remuneracao, taxas.ofertaGratidao);
  const semeadura = calculaContribuicao(remuneracao, taxas.semeadura);
  const ofertaIsrael = calculaContribuicao(remuneracao, taxas.ofertaIsrael);

  ofertaMinisterioSocorroEl.value = formatarNumero(ofertaMinisterioSocorro);
  ofertaGratidaoEl.value = formatarNumero(ofertaGratidao);
  semeaduraEl.value = formatarNumero(semeadura);
  ofertaIsraelEl.value = formatarNumero(ofertaIsrael);
}

function calculaTotalContribuicao() {
  const totalContribuicao =
    valorCalculavel(primiciaEl.value) +
    valorCalculavel(dizimoEl.value) +
    valorCalculavel(ofertaMinisterioSocorroEl.value) +
    valorCalculavel(ofertaGratidaoEl.value) +
    valorCalculavel(semeaduraEl.value) +
    valorCalculavel(ofertaIsraelEl.value);

  totalContribuicaoEl.value = formatarNumero(totalContribuicao);
}

function calculaTributos() {
  const remuneracao = valorCalculavel(remuneracaoEl.value) || 0;
  const primicia = calculaPrimicia(remuneracao);

  calculaDizimo(remuneracao, primicia);
  calculaOfertas(remuneracao);
  calculaTotalContribuicao();
}

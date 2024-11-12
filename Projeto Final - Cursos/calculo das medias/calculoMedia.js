// Modelo Mongoose
const mongoose = require("mongoose");

const Avaliacoes = mongoose.model("Avaliacoes", {
  nome: String,
  descricao: String,
  questoes: String,
  pontuacao_maxima: String,
  duracao: String,
  data_inicio: String,
});

// Função para calcular média das notas do aluno
function calcularMedia(...notas) {
  if (notas.length === 0) return 0;

  const soma = notas.reduce((total, nota) => total + nota, 0);
  return soma / notas.length;
}

// Função para exibir o resultado
function exibirResultado() {
  const notas = [
    parseFloat(document.getElementById("nota1").value),
    parseFloat(document.getElementById("nota2").value),
    parseFloat(document.getElementById("nota3").value),
    parseFloat(document.getElementById("nota4").value),
  ];

  const media = calcularMedia(...notas);
  document.getElementById(
    "resultado"
  ).innerText = `Média do Aluno: ${media.toFixed(2)}`;
}

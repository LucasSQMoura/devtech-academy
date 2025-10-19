class Aluno {
  constructor(nome, idade, curso, notaFinal) {
    this.nome = nome;
    this.idade = idade;
    this.curso = curso;
    this.notaFinal = parseFloat(notaFinal);
  }

  isAprovado() {
    return this.notaFinal >= 7;
  }

  toString() {
    return `${this.nome} (${this.curso}) - Nota: ${this.notaFinal}`;
  }
}

const form = document.getElementById("formAluno");
const tabela = document.getElementById("tabelaAlunos");

let alunos = [];
let editIndex = -1;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;
  const curso = document.getElementById("curso").value;
  const notaFinal = document.getElementById("notaFinal").value;

  const aluno = new Aluno(nome, idade, curso, notaFinal);

  if (editIndex === -1) alunos.push(aluno);
  else alunos[editIndex] = aluno;

  editIndex = -1;
  form.reset();
  renderTabela();
});

const renderTabela = () => {
  tabela.innerHTML = "";
  alunos.forEach((aluno, index) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${aluno.idade}</td>
      <td>${aluno.curso}</td>
      <td>${aluno.notaFinal}</td>
      <td>
        <button class="btn-editar">Editar</button>
        <button class="btn-excluir">Excluir</button>
      </td>
    `;
    linha.querySelector(".btn-editar").addEventListener("click", () => editarAluno(index));
    linha.querySelector(".btn-excluir").addEventListener("click", () => excluirAluno(index));
    tabela.appendChild(linha);
  });
};

const editarAluno = (index) => {
  const a = alunos[index];
  document.getElementById("nome").value = a.nome;
  document.getElementById("idade").value = a.idade;
  document.getElementById("curso").value = a.curso;
  document.getElementById("notaFinal").value = a.notaFinal;
  editIndex = index;
  alert(`Editando ${a.nome}`);
};

const excluirAluno = (index) => {
  alert(`Excluindo ${alunos[index].nome}`);
  alunos.splice(index, 1);
  renderTabela();
};

const relatorio = document.getElementById("relatorio");

const listarAprovados = () => {
  const aprovados = alunos.filter(a => a.isAprovado());
  relatorio.textContent = "Aprovados:\n" + aprovados.map(a => a.toString()).join("\n");
};

const mediaNotas = () => {
  if (alunos.length === 0) return relatorio.textContent = "Sem alunos cadastrados.";
  const media = alunos.reduce((acc, a) => acc + a.notaFinal, 0) / alunos.length;
  relatorio.textContent = `Média das notas: ${media.toFixed(2)}`;
};

const mediaIdades = () => {
  if (alunos.length === 0) return relatorio.textContent = "Sem alunos cadastrados.";
  const media = alunos.reduce((acc, a) => acc + parseInt(a.idade), 0) / alunos.length;
  relatorio.textContent = `Média das idades: ${media.toFixed(2)}`;
};

const ordenarNomes = () => {
  const nomes = alunos.map(a => a.nome).sort();
  relatorio.textContent = "Nomes em ordem alfabética:\n" + nomes.join("\n");
};

const quantidadePorCurso = () => {
  const qtd = alunos.reduce((acc, a) => {
    acc[a.curso] = (acc[a.curso] || 0) + 1;
    return acc;
  }, {});
  relatorio.textContent = "Quantidade por curso:\n" + JSON.stringify(qtd, null, 2);
};

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
  nome.value = a.nome;
  idade.value = a.idade;
  curso.value = a.curso;
  notaFinal.value = a.notaFinal;
  editIndex = index;
  alert(`Editando ${a.nome}`);
};

const excluirAluno = (index) => {
  alert(`Excluindo ${alunos[index].nome}`);
  alunos.splice(index, 1);
  renderTabela();
};


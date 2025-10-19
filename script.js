let alunos = [];
let editIndex = -1;

const form = document.getElementById("formAluno");
const tabela = document.getElementById("tabelaAlunos");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;
  const curso = document.getElementById("curso").value;
  const notaFinal = document.getElementById("notaFinal").value;

  const aluno = { nome, idade, curso, notaFinal };

  if (editIndex === -1) {
    alunos.push(aluno);
  } else {
    alunos[editIndex] = aluno;
    editIndex = -1;
  }

  form.reset();
  renderTabela();
});

function renderTabela() {
  tabela.innerHTML = "";
  alunos.forEach((aluno, index) => {
    tabela.innerHTML += `
      <tr>
        <td>${aluno.nome}</td>
        <td>${aluno.idade}</td>
        <td>${aluno.curso}</td>
        <td>${aluno.notaFinal}</td>
        <td>
          <button onclick="editarAluno(${index})">Editar</button>
          <button onclick="excluirAluno(${index})">Excluir</button>
        </td>
      </tr>
    `;
  });
}

function editarAluno(index) {
  const aluno = alunos[index];
  document.getElementById("nome").value = aluno.nome;
  document.getElementById("idade").value = aluno.idade;
  document.getElementById("curso").value = aluno.curso;
  document.getElementById("notaFinal").value = aluno.notaFinal;
  editIndex = index;
}

function excluirAluno(index) {
  alunos.splice(index, 1);
  renderTabela();
}

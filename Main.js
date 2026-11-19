let turmas = [];

function cadastroTurmas() {
  Interface.abrirTurmas(turmas);
}

function btnSalvarTurma() {
  const novaTurma = Interface.salvarTurma();
  if (novaTurma) {
    turmas.push(novaTurma);
    Interface.renderizarTurmas(turmas);
  }
}

function cadastroAluno() {
  Interface.abrirCadastroAluno(turmas);
}

function btnSalvarAluno() {
  Interface.salvarAluno(turmas);
}

function listarAluno() {
  Interface.abrirListar(turmas);
}

function atualizarListaAlunos() {
  const indiceTurma = Number(
    document.getElementById('select-turma-filtro').value
  );
  Interface.renderizarAlunos(turmas, indiceTurma);
}

function EditarAluno(indiceTurma, indiceAluno) {
  Interface.renderizarAlunos(turmas, indiceTurma, indiceAluno);
}

function AlunoEditado(indiceTurma, indiceAluno) {
  const n1 = document.getElementById(`edit-n1-${indiceAluno}`).value;
  const n2 = document.getElementById(`edit-n2-${indiceAluno}`).value;
  const n3 = document.getElementById(`edit-n3-${indiceAluno}`).value;

  if (n1 === '' || n2 === '' || n3 === '') {
    alert('Preencha todas as notas antes de salvar.');
    return;
  }

  const aluno = turmas[indiceTurma].getAlunos()[indiceAluno];
  aluno.setNota1(n1);
  aluno.setNota2(n2);
  aluno.setNota3(n3);

  Interface.renderizarAlunos(turmas, indiceTurma);
}

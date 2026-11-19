class Interface {
  static alternarAba(abaAtiva) {
    const abas = ['turmas', 'cadastrar', 'listar'];
    abas.forEach((aba) => {
      document
        .getElementById(`btn-${aba}`)
        .classList.toggle('active', aba === abaAtiva);
      document
        .getElementById(`tab-${aba}`)
        .classList.toggle('active', aba === abaAtiva);
    });
  }

  static abrirTurmas(turmas) {
    this.alternarAba('turmas');
    this.renderizarTurmas(turmas);
  }

  static salvarTurma() {
    const cursoInput = document.getElementById('curso');
    const profInput = document.getElementById('professor');
    const curso = cursoInput.value.trim();
    const professor = profInput.value.trim();

    if (!curso || !professor) {
      alert('Preencha o nome do curso e o professor.');
      return null;
    }

    const novaTurma = new Turma(curso, professor);
    cursoInput.value = '';
    profInput.value = '';
    alert('Turma cadastrada com sucesso!');
    return novaTurma;
  }

  static renderizarTurmas(turmas) {
    const container = document.getElementById('lista-turmas');
    if (turmas.length === 0) {
      container.innerHTML = '<p>Nenhuma turma cadastrada ainda.</p>';
      return;
    }

    let html = '<ul class="lista-alunos">';
    turmas.forEach((t) => {
      html += `<li><strong>${t.getNomeCurso()}</strong> — Prof. ${t.getProfessor()} (${
        t.getAlunos().length
      } aluno(s))</li>`;
    });
    html += '</ul>';
    container.innerHTML = html;
  }

  static abrirCadastroAluno(turmas) {
    this.alternarAba('cadastrar');
    const aviso = document.getElementById('aviso-sem-turma');
    const form = document.getElementById('form-aluno');
    const select = document.getElementById('select-turma-cadastro');

    if (turmas.length === 0) {
      aviso.style.display = 'block';
      form.style.display = 'none';
      return;
    }

    aviso.style.display = 'none';
    form.style.display = 'flex';
    form.style.flexDirection = 'column';
    form.style.gap = '10px';

    select.innerHTML = turmas
      .map(
        (t, index) =>
          `<option value="${index}">${t.getNomeCurso()} (Prof. ${t.getProfessor()})</option>`
      )
      .join('');
  }

  static salvarAluno(turmas) {
    if (turmas.length === 0) {
      alert('É necessário cadastrar uma turma primeiro.');
      return;
    }

    const indiceTurma = Number(
      document.getElementById('select-turma-cadastro').value
    );
    const nomeInput = document.getElementById('nome');
    const n1Input = document.getElementById('n1');
    const n2Input = document.getElementById('n2');
    const n3Input = document.getElementById('n3');

    const nome = nomeInput.value.trim();
    if (
      !nome ||
      n1Input.value === '' ||
      n2Input.value === '' ||
      n3Input.value === ''
    ) {
      alert('Preencha o nome e as 3 notas do aluno.');
      return;
    }

    const aluno = new Aluno(nome, n1Input.value, n2Input.value, n3Input.value);
    turmas[indiceTurma].adicionarAluno(aluno);

    nomeInput.value = '';
    n1Input.value = '';
    n2Input.value = '';
    n3Input.value = '';
    alert('Aluno cadastrado com sucesso!');
  }

  static abrirListar(turmas) {
    this.alternarAba('listar');
    const select = document.getElementById('select-turma-filtro');
    const container = document.getElementById('alunos');

    if (turmas.length === 0) {
      select.innerHTML = '<option value="">Nenhuma turma disponível</option>';
      container.innerHTML =
        '<p>Cadastre uma turma e adicione alunos primeiro.</p>';
      return;
    }

    select.innerHTML = turmas
      .map(
        (t, index) =>
          `<option value="${index}">${t.getNomeCurso()} (Prof. ${t.getProfessor()})</option>`
      )
      .join('');

    this.renderizarAlunos(turmas, 0);
  }

  static renderizarAlunos(turmas, indiceTurma, indiceEditando = -1) {
    const container = document.getElementById('alunos');
    const turma = turmas[indiceTurma];

    if (!turma || turma.getAlunos().length === 0) {
      container.innerHTML = '<p>Nenhum aluno cadastrado nesta turma.</p>';
      return;
    }

    const alunos = turma.getAlunos();
    let html = `
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Nota 1</th>
            <th>Nota 2</th>
            <th>Nota 3</th>
            <th>Média</th>
            <th>Situação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
    `;

    alunos.forEach((aluno, i) => {
      if (i === indiceEditando) {
        html += `
          <tr>
            <td>${aluno.getNome()}</td>
            <td><input type="number" id="edit-n1-${i}" class="input-nota-edit" step="0.1" min="0" max="10" value="${aluno.getNota1()}" /></td>
            <td><input type="number" id="edit-n2-${i}" class="input-nota-edit" step="0.1" min="0" max="10" value="${aluno.getNota2()}" /></td>
            <td><input type="number" id="edit-n3-${i}" class="input-nota-edit" step="0.1" min="0" max="10" value="${aluno.getNota3()}" /></td>
            <td>${aluno.getMedia().toFixed(2)}</td>
            <td>${aluno.getEstado()}</td>
            <td>
              <button class="btn-acao btn-confirmar" onclick="AlunoEditado(${indiceTurma}, ${i})">Salvar</button>
              <button class="btn-acao btn-cancelar" onclick="atualizarListaAlunos()">Cancelar</button>
            </td>
          </tr>
        `;
      } else {
        html += `
          <tr>
            <td>${aluno.getNome()}</td>
            <td>${aluno.getNota1().toFixed(1)}</td>
            <td>${aluno.getNota2().toFixed(1)}</td>
            <td>${aluno.getNota3().toFixed(1)}</td>
            <td><strong>${aluno.getMedia().toFixed(2)}</strong></td>
            <td>${aluno.getEstado()}</td>
            <td>
              <button class="btn-acao btn-editar" onclick="EditarAluno(${indiceTurma}, ${i})">Editar Notas</button>
            </td>
          </tr>
        `;
      }
    });

    html += '</tbody></table>';
    container.innerHTML = html;
  }
}

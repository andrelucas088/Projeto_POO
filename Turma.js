class Turma {
  #nomeCurso;
  #professor;
  #alunos;

  constructor(nomeCurso, professor) {
    this.#nomeCurso = nomeCurso;
    this.#professor = professor;
    this.#alunos = [];
  }

  adicionarAluno(aluno) {
    this.#alunos.push(aluno);
  }

  getAlunos() {
    return this.#alunos;
  }

  getNomeCurso() {
    return this.#nomeCurso;
  }
  setNomeCurso(nomeCurso) {
    this.#nomeCurso = nomeCurso;
  }

  getProfessor() {
    return this.#professor;
  }
  setProfessor(professor) {
    this.#professor = professor;
  }
}
class Aluno {
  #nome;
  #nota1;
  #nota2;
  #nota3;
  #media;
  #estado;

  constructor(nome, nota1, nota2, nota3) {
    this.#nome = nome;
    this.#nota1 = Number(nota1);
    this.#nota2 = Number(nota2);
    this.#nota3 = Number(nota3);
    this.atualizarDesempenho();
  }

  atualizarDesempenho() {
    this.gerarMedia();
    this.gerarEstado();
  }

  gerarMedia() {
    this.#media = (this.#nota1 + this.#nota2 + this.#nota3) / 3;
    return this.#media;
  }

  gerarEstado() {
    if (this.#media >= 6) {
      this.#estado = 'Aprovado';
    } else if (this.#media >= 3) {
      this.#estado = 'Recuperação';
    } else {
      this.#estado = 'Reprovado';
    }
    return this.#estado;
  }

  // Getters e Setters
  getNome() {
    return this.#nome;
  }
  setNome(nome) {
    this.#nome = nome;
  }

  getNota1() {
    return this.#nota1;
  }
  setNota1(nota1) {
    this.#nota1 = Number(nota1);
    this.atualizarDesempenho();
  }

  getNota2() {
    return this.#nota2;
  }
  setNota2(nota2) {
    this.#nota2 = Number(nota2);
    this.atualizarDesempenho();
  }

  getNota3() {
    return this.#nota3;
  }
  setNota3(nota3) {
    this.#nota3 = Number(nota3);
    this.atualizarDesempenho();
  }

  getMedia() {
    return this.#media;
  }

  getEstado() {
    return this.#estado;
  }
}
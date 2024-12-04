export interface Livro {
  id?: number;
  titulo: string;
  editora: string;
  edicao: number|undefined;
  anoPublicacao: string;
  autores: number[];
  assuntos: number[];
  valor: number|undefined;
}

import { Component, OnInit } from '@angular/core';
import { Livro } from '../../model/livro.model'; // Ajuste o caminho relativo
import { LivroService } from '../../services/livro.service';
import { Autor } from '../../model/autor.model';
import { AutorService } from '../../services/autor.service';
import { AssuntoService } from '../../services/assunto.service';
import { Assunto } from '../../model/assunto.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-livro',
  standalone: false,

  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css'],
})
export class LivroComponent implements OnInit {
  assuntos: Assunto[] = [];
  assuntosSelecionados: number[] = [];
  autores: Autor[] = [];
  autoresSelecionados: number[] = [];
  livros: Livro[] = [];
  livroAtual: Livro = {
    titulo: '',
    editora: '',
    edicao: undefined,
    anoPublicacao: '',
    autores: [],
    assuntos: [],
    valor: undefined,
  };

  editando = false;
  mensagemErro: string | null = null;


  constructor(
    private livroService: LivroService,
    private autorService: AutorService,
    private assuntoService: AssuntoService
  ) {}

  ngOnInit(): void {
    this.carregarLivros();
    this.carregarAutores();
    this.carregarAssuntos();
  }

  onAutorChange(event: Event, autorId: number): void {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      // Adicionar o ID ao array se estiver selecionado
      this.autoresSelecionados.push(autorId);
    } else {
      // Remover o ID do array se estiver desmarcado
      this.autoresSelecionados = this.autoresSelecionados.filter((id) => id !== autorId);
    }
  }

  onAssuntoChange(event: Event, assuntoId: number): void {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      // Adiciona o ID ao array se estiver marcado
      if (!this.assuntosSelecionados.includes(assuntoId)) {
        this.assuntosSelecionados.push(assuntoId);
      }
    } else {
      // Remove o ID do array se estiver desmarcado
      this.assuntosSelecionados = this.assuntosSelecionados.filter((id) => id !== assuntoId);
    }

    console.log('Assuntos selecionados:', this.assuntosSelecionados);
  }


  carregarLivros(): void {
    this.livroService.getLivros().subscribe(
      (data: Livro[]) => {
        this.livros = data;
        this.mensagemErro = null; // Limpa mensagem de erro
      },
      (error) => {
        console.error('Erro ao carregar livros:', error);
        this.mensagemErro = 'Não foi possível carregar os livros. Tente novamente mais tarde.';
      }
    );
  }

  carregarAutores(): void {
    this.autorService.getAutores().subscribe(
      (data: Autor[]) => {
        this.autores = data;
      },
      (error) => {
        console.error('Erro ao carregar autores:', error);
      }
    );
  }

  carregarAssuntos(): void {
    this.assuntoService.getAssuntos().subscribe(
      (data: Assunto[]) => {
        this.assuntos = data;
      },
      (error) => {
        console.error('Erro ao carregar autores:', error);
      }
    );
  }

  salvarLivro(): void {
    this.mensagemErro = null;

/*
    const valorConvertido = parseFloat(
      String(this.livroAtual.valor) // Converte o número para string
        .replace(/[^\d,]/g, '') // Remove caracteres não numéricos, exceto vírgula
        .replace(',', '.') // Substitui a vírgula por ponto
    );

    // Atualiza o campo `valor` para número
    this.livroAtual.valor = valorConvertido;
*/
    // Validação básica
    if (!this.livroAtual.titulo || !this.livroAtual.editora) {
      this.mensagemErro = 'Título e editora são obrigatórios.';
      return;
    }
    // Usa os IDs dos autores diretamente
    this.livroAtual.autores = [...this.autoresSelecionados]; // Certifique-se de que são IDs válidos
    this.livroAtual.assuntos = [...this.assuntosSelecionados];

    // Define a operação (adicionar ou editar)
    const operacao = this.editando && this.livroAtual.id
      ? this.livroService.editarLivro(this.livroAtual.id, this.livroAtual)
      : this.livroService.adicionarLivro(this.livroAtual);

    // Executa a operação e trata o resultado
    operacao.subscribe(
      () => {
        this.carregarLivros();
        this.limparFormulario();
      },
      (error) => {
        console.error('Erro ao salvar livro:', error);
        this.mensagemErro = error.error?.message || 'Erro ao salvar livro.';
      }
    );
  }




  editarLivro(livro: Livro): void {
    this.livroAtual = { ...livro };
    // Verifique se autores é um array antes de usar o operador spread
    this.autoresSelecionados = Array.isArray(livro.autores) ? [...livro.autores] : [];
    // Verifique se assuntos é um array antes de usar o operador spread
    this.assuntosSelecionados = Array.isArray(livro.assuntos) ? [...livro.assuntos] : [];
    this.editando = true;
  }


  excluirLivro(id: number): void {
    this.livroService.excluirLivro(id).subscribe(
      () => {
        this.carregarLivros();
      },
      (error) => {
        console.error('Erro ao excluir livro:', error);
      }
    );
  }

  limparFormulario(): void {
    this.livroAtual = {
      titulo: '',
      editora: '',
      edicao: undefined,
      anoPublicacao: '',
      autores: [], // Certifique-se de que autores é um array vazio
      assuntos:[],
      valor: undefined,
    };
    this.autoresSelecionados = []; // Reseta os IDs dos autores selecionados
    this.assuntosSelecionados = [];
    this.editando = false;
    this.mensagemErro = null;
  }


  bloquearNaoNumericos(event: KeyboardEvent): void {
    const key = event.key;
    const regex = /[0-9.,]/;
    if (!regex.test(key)) {
      event.preventDefault();
    }
  }

}



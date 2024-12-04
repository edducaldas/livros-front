import { Component } from '@angular/core';
import { Assunto } from '../../model/assunto.model';
import { AssuntoService } from '../../services/assunto.service';

@Component({
  selector: 'app-assunto',
  standalone: false,

  templateUrl: './assunto.component.html',
  styleUrl: './assunto.component.css'
})
export class AssuntoComponent {
  assuntos: Assunto[] = [];
  assuntoAtual: Assunto = {
    descricao: '',
  };
  editando = false;
  mensagemErro: string | null = null;

  constructor(private assuntoService: AssuntoService) {}

  ngOnInit(): void {
    console.log('LivroComponent carregado!');
    this.carregarAssuntos();
  }

  carregarAssuntos(): void {
    this.assuntoService.getAssuntos().subscribe(
      (data: Assunto[]) => {
        this.assuntos = data;
      },
      (error) => {
        console.error('Erro ao carregar autor:', error);
      }
    );
  }

  salvarAssunto(): void {
    this.mensagemErro = null;
    if (this.editando && this.assuntoAtual.id) {
      this.assuntoService.editarAssunto(this.assuntoAtual.id, this.assuntoAtual).subscribe(
        () => {
          this.carregarAssuntos();
          this.limparFormulario();
        },
        (error) => {
          console.error('Erro ao editar livro:', error);
          this.mensagemErro = error.error?.message || 'Erro ao editar autor.';
        }
      );
    } else {
      this.assuntoService.adicionarAssunto(this.assuntoAtual).subscribe(
        () => {
          this.carregarAssuntos(); // Atualiza a lista após a adição
          this.limparFormulario();
        },
        (error) => {
          console.error('Erro ao adicionar autor:', error);
          this.mensagemErro = error.error?.message || 'Erro ao adicionar autor.'; // Lê a mensagem do backend
        }
      );
    }
  }

  editarAssunto(assunto: Assunto): void {
    this.assuntoAtual = { ...assunto };
    this.editando = true;
  }

  excluirAssunto(id: number): void {
    this.assuntoService.excluirAssunto(id).subscribe({
      next: () => {
        this.carregarAssuntos(); // Atualiza a lista após exclusão bem-sucedida
      },
      error: (error: any) => {
        console.error('Erro ao excluir autor:', error);
        // Aqui usamos error.message pois é passado no throwError
        this.mensagemErro = error.message || 'Erro ao excluir autor.';
      },
    });
  }

  limparFormulario(): void {
    this.assuntoAtual = {
      descricao: '',
    };
    this.editando = false;
    this.mensagemErro = null;

  }
}

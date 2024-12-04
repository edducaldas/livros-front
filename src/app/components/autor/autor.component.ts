import { Component } from '@angular/core';
import { Autor } from '../../model/autor.model';
import { AutorService } from '../../services/autor.service';

@Component({
  selector: 'app-autor',
  standalone: false,
  templateUrl: './autor.component.html',
  styleUrl: './autor.component.css'
})
export class AutorComponent {
  autores: Autor[] = [];
  autorAtual: Autor = {
    nome: '',
  };
  editando = false;
  mensagemErro: string | null = null;

  constructor(private autorService: AutorService) {}

  ngOnInit(): void {
    console.log('LivroComponent carregado!');
    this.carregarAutores();
  }

  carregarAutores(): void {
    this.autorService.getAutores().subscribe(
      (data: Autor[]) => {
        this.autores = data;
      },
      (error) => {
        console.error('Erro ao carregar autor:', error);
      }
    );
  }

  salvarAutor(): void {
    this.mensagemErro = null;
    if (this.editando && this.autorAtual.id) {
      this.autorService.editarAutor(this.autorAtual.id, this.autorAtual).subscribe(
        () => {
          this.carregarAutores();
          this.limparFormulario();
        },
        (error) => {
          console.error('Erro ao editar livro:', error);
          this.mensagemErro = error.error?.message || 'Erro ao editar autor.';
        }
      );
    } else {
      this.autorService.adicionarAutor(this.autorAtual).subscribe(
        () => {
          this.carregarAutores(); // Atualiza a lista após a adição
          this.limparFormulario();
        },
        (error) => {
          console.error('Erro ao adicionar autor:', error);
          this.mensagemErro = error.error?.message || 'Erro ao adicionar autor.'; // Lê a mensagem do backend
        }
      );
    }
  }

  editarAutor(autor: Autor): void {
    this.autorAtual = { ...autor };
    this.editando = true;
  }


  excluirAutor(id: number): void {
    this.autorService.excluirAutor(id).subscribe({
      next: () => {
        this.carregarAutores(); // Atualiza a lista após exclusão bem-sucedida
      },
      error: (error: any) => {
        console.error('Erro ao excluir autor:', error);
        // Aqui usamos error.message pois é passado no throwError
        this.mensagemErro = error.message || 'Erro ao excluir autor.';
      },
    });
  }



  limparFormulario(): void {
    this.autorAtual = {
      nome: '',
    };
    this.editando = false;
    this.mensagemErro = null;

  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from '../model/livro.model'; // Ajuste o caminho se necessário

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private apiUrl = 'http://localhost:8080/api/livros';

  constructor(private http: HttpClient) {}

  getLivros(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.apiUrl);
  }


  adicionarLivro(livro: Livro): Observable<any> {
    return this.http.post(`${this.apiUrl}`, livro, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  editarLivro(id: number, livroAtualizado: Livro): Observable<any> {
    return this.http.put<Livro>(`${this.apiUrl}/${id}`, livroAtualizado);
  }

  excluirLivro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  adicionarAutores(livroId: number, autorIds: number[]): Observable<any> {
    return this.http.put(`${this.apiUrl}/${livroId}/autores`, autorIds);
  }

}

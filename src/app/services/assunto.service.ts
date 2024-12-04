import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Assunto } from '../model/assunto.model';

@Injectable({
  providedIn: 'root'
})
export class AssuntoService {
  private apiUrl = 'http://localhost:8080/api/assuntos';

  constructor(private http: HttpClient) {}

  getAssuntos(): Observable<Assunto[]> {
    return this.http.get<Assunto[]>(this.apiUrl);
  }

  adicionarAssunto(assunto: Assunto): Observable<Assunto> {
    return this.http.post<Assunto>(this.apiUrl, assunto);
  }

  editarAssunto(id: number, assuntoAtualizado: Assunto): Observable<Assunto> {
    return this.http.put<Assunto>(`${this.apiUrl}/${id}`, assuntoAtualizado);
  }


  excluirAssunto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        // Repassa o erro para o componente
        return throwError(() => new Error(error.error.message || 'Erro desconhecido'));
      })
    );
  }
}

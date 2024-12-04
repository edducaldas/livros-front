import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivroComponent } from './components/livro/livro.component';
import { AutorComponent } from './components/autor/autor.component';
import { AssuntoComponent } from './components/assunto/assunto.component';


const routes: Routes = [
  { path: '', redirectTo: '/livros', pathMatch: 'full' },
  { path: 'livros', component: LivroComponent },
  { path: 'autores', component: AutorComponent },
  { path: 'assuntos', component: AssuntoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

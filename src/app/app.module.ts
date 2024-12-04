import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LivroComponent } from './components/livro/livro.component';
import { AutorComponent } from './components/autor/autor.component';
import { AssuntoComponent } from './components/assunto/assunto.component';
import { MenuComponent } from './components/menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';


@NgModule({
  declarations: [
    AppComponent,
    LivroComponent,
    AutorComponent,
    AssuntoComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, // Adicione aqui
    AppRoutingModule, // Inclui o módulo de rotas
    NgxMaskDirective // Importação do NgxMaskDirective
  ],
  providers: [
    provideNgxMask(), // Configuração necessária para o ngx-mask
    { provide: LOCALE_ID, useValue: 'pt-BR' } // Define o locale como pt-BR

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

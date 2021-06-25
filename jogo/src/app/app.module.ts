import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { GameComponent } from './components/game/game.component';
import { QuatroZeroQuatroComponent } from './components/quatro-zero-quatro/quatro-zero-quatro.component';
import { PersonagensComponent } from './components/personagens/personagens.component';
import { CriarpersonagensComponent } from './components/personagens/criarpersonagens/criarpersonagens.component';
import { CriarArmaComponent } from './components/personagens/criar-arma/criar-arma.component';
import { AventuraComponent } from './components/aventura/aventura.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameComponent,
    QuatroZeroQuatroComponent,
    PersonagensComponent,
    CriarpersonagensComponent,
    CriarArmaComponent,
    AventuraComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

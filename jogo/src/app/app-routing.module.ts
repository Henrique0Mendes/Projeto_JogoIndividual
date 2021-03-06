import { Host, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { HomeComponent } from './components/home/home.component';
import { CriarArmaComponent } from './components/personagens/criar-arma/criar-arma.component';
import { CriarpersonagensComponent } from './components/personagens/criarpersonagens/criarpersonagens.component';
import { PersonagensComponent } from './components/personagens/personagens.component';
import { QuatroZeroQuatroComponent } from './components/quatro-zero-quatro/quatro-zero-quatro.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"Home",component:HomeComponent},
  {path:"Personagens",component:PersonagensComponent},
  {path:"CriarPersonagem",component:CriarpersonagensComponent},
  {path:"CriarArma",component:CriarArmaComponent},
  {path:"Jogar",component:GameComponent},
  {path:"notFound", component:QuatroZeroQuatroComponent},
  {path:"**",redirectTo: "notFound"},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

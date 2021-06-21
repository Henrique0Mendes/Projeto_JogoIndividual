import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicosService } from 'src/app/services/servicos.service';
import { Personagem } from 'src/app/classes/personagem';
import { Arma } from 'src/app/classes/arma';

@Component({
  selector: 'app-personagens',
  templateUrl: './personagens.component.html',
  styleUrls: ['./personagens.component.css']
})
export class PersonagensComponent implements OnInit {

  constructor(private service: ServicosService, router:Router) { 
  }

  ngOnInit(): void {
    this.receberPersonagem();
  }

  fotoTipoPers:string;

  recivedata ?: any;
  arrayPersonagens : Array<Personagem> =[];
  StorePersonagem: Personagem;
  indexPersonagem:number;
  idPersonagem;
  ataquezinho;
  vidazinha;
  inteligenciazinha;
  tipoPersona;

idPlayer = localStorage.getItem("idPlayer");

receberPersonagem() {
  this.service.receberPersonagem(this.idPlayer).subscribe( 
    (data) => {
        this.recivedata = data;
        console.log(this.recivedata['data'].Personagens);
        if(this.recivedata['code'] == 200){
          this.arrayPersonagens = this.recivedata['data'].Personagens.map(( x: any) => new Personagem(x) )
        }else{
          alert("Erro Personagem");
        } 
        this.idPersonagem = this.arrayPersonagens[0].idPersonagem;
        this.ataquezinho = this.arrayPersonagens[0].ataque;
        this.vidazinha = this.arrayPersonagens[0].vida;
        this.inteligenciazinha = this.arrayPersonagens[0].Inteligencia;
        this.tipoPersona = this.arrayPersonagens[0].isMonset;
        this.mudarFoto();
        localStorage.removeItem("idPersonagem");
        localStorage.setItem("idPersonagem",this.idPersonagem);
        this.receberArma();
  });
}

recivedata2 ?: any;
arrayArmas : Array<Arma> =[];
indexArma:number;
idPersonagemArma;
ataquezinhoArma;
TipoDeArma;
durabilidadeArma;
 
receberArma() {
  this.service.receberArma(this.idPersonagem).subscribe( 
    (data) => {
        this.recivedata2 = data;
        console.log(this.recivedata2['data'].Armas);
        if(this.recivedata2['code'] == 200){
          this.arrayArmas = this.recivedata2['data'].Armas.map(( x: any) => new Arma(x) )
          document.getElementById("armas").style.display="block";
          document.getElementById("naoTemArmas").style.display="none";
        }else{
          document.getElementById("armas").style.display="none";
          document.getElementById("naoTemArmas").style.display="block";
        }
        this.ataquezinhoArma = this.arrayArmas[0].atk;
        this.TipoDeArma = this.arrayArmas[0].TipoDeArma;
        this.durabilidadeArma = this.arrayArmas[0].durabilidade;
  });
}

  mudarStats(event){
    this.indexPersonagem = event.target.value;
    console.log(this.indexPersonagem);
    this.idPersonagem = this.arrayPersonagens[this.indexPersonagem].idPersonagem;
    this.ataquezinho = this.arrayPersonagens[this.indexPersonagem].ataque;
    this.inteligenciazinha = this.arrayPersonagens[this.indexPersonagem].Inteligencia;
    this.tipoPersona = this.arrayPersonagens[this.indexPersonagem].isMonset;
    this.mudarFoto();
    localStorage.removeItem("idPersonagem");
    localStorage.setItem("idPersonagem",this.idPersonagem);
    this.receberArma();

  }

  mudarArma(event){
    this.indexArma = event.target.value;
    console.log(this.indexArma);
    this.ataquezinhoArma = this.arrayArmas[this.indexArma].atk;
    this.TipoDeArma = this.arrayArmas[this.indexArma].TipoDeArma;
    this.durabilidadeArma = this.arrayArmas[this.indexArma].durabilidade;
  }

  mudarFoto(){
    if (this.tipoPersona == 0){
      this.fotoTipoPers="../../../assets/imagens/hunter.png";
    }else if (this.tipoPersona == 1) {
      this.fotoTipoPers="../../../assets/imagens/monster.png";
    }
  }

  

}



import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicosService } from 'src/app/services/servicos.service';
import { Personagem } from 'src/app/classes/personagem';
import { Arma } from 'src/app/classes/arma';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-personagens',
  templateUrl: './personagens.component.html',
  styleUrls: ['./personagens.component.css']
})
export class PersonagensComponent implements OnInit {

  constructor(private service: ServicosService, router:Router,config: NgbModalConfig, private modalService: NgbModal ) {
    this.router = router;
    config.backdrop = 'static';
    config.keyboard = false;
  } 

  router: Router;
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
  nomezinho;
  vidazinha;
  inteligenciazinha;
  tipoPersona;

idPlayer = localStorage.getItem("idPlayer");

openTreinar(content2){
  this.modalService.open(content2);}

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
        this.nomezinho = this.arrayPersonagens[0].name;
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
indexArma;
idPersonagemArma;
ataquezinhoArma;
TipoDeArma;
durabilidadeArma;
 
receberArma() {
  this.service.receberArma(this.idPersonagem).subscribe( 
    (data) => {
        this.recivedata2 = data;
        console.log(this.recivedata2['data']);
        if(this.recivedata2['code'] == 200){
          this.arrayArmas = this.recivedata2['data'].Armas.map(( x: any) => new Arma(x) )
          document.getElementById("armas").style.display="block";
          document.getElementById("naoTemArmas").style.display="none";
          this.ataquezinhoArma = this.arrayArmas[0].atk;
          this.TipoDeArma = this.arrayArmas[0].TipoDeArma;
          this.durabilidadeArma = this.arrayArmas[0].durabilidade;
          this.indexArma = 0;
        }else{
          document.getElementById("armas").style.display="none";
          document.getElementById("naoTemArmas").style.display="block";
          this.indexArma = undefined;
        }
        this.mudarFoto();
  });
}

  mudarStats(event){
    this.indexPersonagem = event.target.value;
    console.log(this.indexPersonagem);
    this.idPersonagem = this.arrayPersonagens[this.indexPersonagem].idPersonagem;
    this.nomezinho = this.arrayPersonagens[this.indexPersonagem].name;
    this.ataquezinho = this.arrayPersonagens[this.indexPersonagem].ataque;
    this.vidazinha = this.arrayPersonagens[this.indexPersonagem].vida;
    this.inteligenciazinha = this.arrayPersonagens[this.indexPersonagem].Inteligencia;
    this.tipoPersona = this.arrayPersonagens[this.indexPersonagem].isMonset;
    this.mudarFoto();
    localStorage.removeItem("idPersonagem");
    localStorage.setItem("idPersonagem",this.idPersonagem);
    this.receberArma();
  }

  mudarArma(event){
    this.indexArma = event.target.value;
    this.ataquezinhoArma = this.arrayArmas[this.indexArma].atk;
    this.TipoDeArma = this.arrayArmas[this.indexArma].TipoDeArma;
    this.durabilidadeArma = this.arrayArmas[this.indexArma].durabilidade;
    this.mudarFoto();
  }

  mudarFoto(){
    if (this.tipoPersona == 0){
      if (this.ataquezinho>=100){
        this.fotoTipoPers='../../../assets/imagens/HunterAleatorio2.png';
      }else{
        this.fotoTipoPers='../../../assets/imagens/hunter.png';
      }
    }else if (this.tipoPersona == 1) {
      console.log(this.indexArma);
      if (this.indexArma === undefined){
        this.fotoTipoPers="../../../assets/imagens/monster.png";
      }else{
        switch(this.TipoDeArma) { 
          case "chinelo": { 
            this.fotoTipoPers="../../../assets/imagens/monsterChinelo.png";
             break; 
          } 
          case "espada": { 
            this.fotoTipoPers="../../../assets/imagens/monsterEspada.png";
             break; 
          }
          case "pistola": { 
            this.fotoTipoPers="../../../assets/imagens/monsterRevolver.png";
             break; 
          } 
          case "cutelo": { 
            this.fotoTipoPers="../../../assets/imagens/monsterCutelo.png";
             break; 
          } 
          default: { 
            this.fotoTipoPers="../../../assets/imagens/monster.png";
             break; 
          } 
      }
     } 
    }
  }
  ismonst:string;
  pontos = localStorage.getItem("pontos");

  treinar(valor, content2, erro){

    if (valor==1){
      let pontosataque= Number(localStorage.getItem("pontos"));
      let ataque = Number(this.ataquezinho);
      this.ataquezinho = ataque + pontosataque;
    }else if (valor==2){
      let pontosvida= Number(localStorage.getItem("pontos"));
      let vida = Number(this.vidazinha);
      this.vidazinha = vida+ pontosvida;
    }else if (valor == 3){
      let pontosint = Number(localStorage.getItem("pontos"));
      let int = Number(this.inteligenciazinha);
      this.inteligenciazinha = int + pontosint;
    }
 
    let nome = localStorage.getItem("nome");
    let pass = localStorage.getItem("pass");
    let iduser = localStorage.getItem("idPersonagem");

    if(this.tipoPersona==1){
       this.ismonst = "true";
    }else{
      this.ismonst = "false";

    }

    console.log(iduser ,this.nomezinho, this.ataquezinho, this.ismonst, this.inteligenciazinha, this.vidazinha, nome,pass);
    this.service.upgrade(iduser , this.nomezinho, this.ataquezinho, this.ismonst, this.inteligenciazinha, this.vidazinha, nome, pass).subscribe((x) => {
      if (x['code'] == 200 ){
        this.modalService.dismissAll(content2);
        console.log(x);
        localStorage.setItem("pontos", "0");
        this.router.navigate(['/Personagens']);
      }else{
        alert("erro");
      }
    }
    );
} 

  

}



import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicosService } from 'src/app/services/servicos.service';
import { Personagem } from 'src/app/classes/personagem';
import { ParseError } from '@angular/compiler';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(private service: ServicosService, router:Router) { }

  ngOnInit(): void {
    this.personagemEscolhida();
    this.personagemAleatoria();
  }
  
  nomePlayer1:string;
  nomePlayer2:string;

  vidaPlayer1 :number=0;
  vida1:number=0;    
  vidaPlayer1Inicial:number=0;


  vidaPlayer2 :number=0;
  vidaPlayer2Inicial:number=0;
  vida2:number=0;

  atkPlayer1 :number=0;
  atkPlayer2 :number=0;

  intePlayer1 :number=0;
  intePlayer2 :number=0;
  
  isMonster;
  isMonster2;

  idPlayer = localStorage.getItem("idPlayer");
  idPersonagem = localStorage.getItem("idPersonagem");

  esquivaPlayer1:number=0;
  esquivaPlayer2:number=0;

  ataqueCriticoPlayer1:number=0;
  ataqueCriticoPlayer2:number=0;

  recivedata ?: any;
  personagens: Array<Personagem> =[];
  personagemSelecionada:Personagem;

  verificarPlayer:number=0;

  danoPlayer1:number=0;
  danoPlayer2:number=0;

  aleatorio:number;

  inteligenciaPerdidaP1:number=0;
  inteligenciaPerdidaP2:number=0;

  regenP1:number=0;
  regenP2:number=0;


  foto='../../../assets/imagens/HunterAleatorio1.png';
  fotoPersonaEscolhida = '../../../assets/imagens/hunter.png';
  personagemEscolhida() {
    this.service.receberPersonagem(this.idPlayer).subscribe( 
      (data) => {
          this.recivedata = data;
          if(this.recivedata['code'] == 200){
            this.personagens = this.recivedata['data'].Personagens.map(( x: any) => new Personagem(x) )
            for (let item of this.personagens) {
              if (item.idPersonagem == this.idPersonagem){
                this.personagemSelecionada = item;
              }
            }
            this.nomePlayer1 = this.personagemSelecionada.name;
            this.atkPlayer1 = this.personagemSelecionada.ataque;
            this.vidaPlayer1 = this.personagemSelecionada.vida;
            this.isMonster = this.personagemSelecionada.isMonset;
            this.intePlayer1 = this.personagemSelecionada.Inteligencia;

            if (this.atkPlayer1>100){
              this.fotoPersonaEscolhida='../../../assets/imagens/HunterAleatorio2.png';
            }else if(this.isMonster == 1){
              this.fotoPersonaEscolhida='../../../assets/imagens/monster.png';
            }
          }else{
            alert("Erro ao receber personagem!");
          } 
    });
  }
  
  personagemAleatoria(){
    this.service.receberPersonagemAleatoria().subscribe((x) => {
      if(x['code'] == 200){
        this.nomePlayer2 = x['data'].Nome;
        this.atkPlayer2 = x['data'].Atk;
        this.vidaPlayer2 = x['data'].Vida;
        this.isMonster2 = x['data'].IsMonset;
        this.intePlayer2 = x['data'].Int;

        this.vidaPlayer2Inicial= this.vidaPlayer2;

        if (this.atkPlayer2>100){
          this.foto='../../../assets/imagens/HunterAleatorio2.png';
        }else if(this.isMonster2 == 1){
          this.foto='../../../assets/imagens/monster.png';
        }

      }
      else{
        console.log('Erro ao receber personagem aleatoria!');
      }
    });
  }

  comecarjogo(){
    document.getElementById("atacar").style.display  = "block";
    document.getElementById("esquiva").style.display = "block";
    document.getElementById("saco").style.display    = "block";
  }

  esquivar(){
    if (this.verificarPlayer%2 == 0){
        this.esquivaPlayer1 = Math.floor(Math.random() * (this.intePlayer1))+1;     
        if (this.esquivaPlayer1>= ((this.intePlayer1/6) * 4.8 )){
            this.inteligenciaPerdidaP1 =  this.intePlayer1 - ((this.intePlayer1) * 0.2);
        }
        this.mudaTurno();
    }else{
      this.esquivaPlayer2 = Math.floor(Math.random() * (this.intePlayer2))+1;     
      if (this.esquivaPlayer2>= ((this.intePlayer2/6) * 4.8 )){
          this.inteligenciaPerdidaP2 =  this.intePlayer2 - ((this.intePlayer2) * 0.2);
      }
      this.calcula();
    }
  }

  regenerar(){
    if (this.verificarPlayer%2 == 0){
      this.regenP1 = Math.floor(Math.random() * (this.vidaPlayer1/6) * 3.5 )+1;
      this.vida1 = this.vidaPlayer1;
      this.mudaTurno();
    }else{
      this.regenP2 = Math.floor(Math.random() * (this.vidaPlayer2/6) * 3.5 )+1;     
      this.vida2 = this.vidaPlayer2;
      this.calcula();
    }
  }

  atacar(){
    if (this.verificarPlayer%2 == 0){/*PLAYER 1 */
      this.ataqueCriticoPlayer1 = Math.floor(Math.random() * (this.intePlayer1))+1;     
      if (this.ataqueCriticoPlayer1>= ((this.intePlayer1/4) * 3.5 )){
        this.danoPlayer1 = Math.floor(Math.random() * this.atkPlayer1) + ((this.atkPlayer1) * 0.25)+1;
      }else{
        this.danoPlayer1 = Math.floor(Math.random() * this.atkPlayer1)+1 ;
      }
      this.mudaTurno();
    }else{ /*PLAYER 2 BOT */
        this.ataqueCriticoPlayer2 = Math.floor(Math.random() * (this.intePlayer2))+1;     
        if (this.ataqueCriticoPlayer2 = ((this.intePlayer2/4) * 3.5 )){
          this.danoPlayer2 = Math.floor(Math.random() * this.atkPlayer2) + ((this.atkPlayer2) * 0.25)+1;
        }else{
          this.danoPlayer2 = Math.floor(Math.random() * this.atkPlayer2)+1 ;
        }
        this.calcula();
    }
  }

  pontos:number=0;

  mudaTurno(){
    if (this.vidaPlayer1<0){
      this.vidaPlayer1 = 0;
    }else if (this.vidaPlayer2<0){
      this.vidaPlayer2 = 0;
    }

    if(this.vidaPlayer1<=0){
      this.winPlayer = this.nomePlayer2;
      document.getElementById("win").style.display="block";
      setTimeout(() => {
        window.location.reload();
      }, 3500);
    }else if (this.vidaPlayer2<=0){
      this.winPlayer = this.nomePlayer1;
      document.getElementById("win").style.display="block";
      this.pontos = Number(localStorage.getItem("pontos"));
      this.pontos =   this.pontos + 1 ;
      console.log(this.pontos);
      localStorage.setItem("pontos", this.pontos.toString());
      setTimeout(() => {
        window.location.reload();
      }, 3500);
    }else{
       this.verificarPlayer +=1;
       this.verificarTurno();
    }
   
  }

  info1:string;
  info2:string;


  winPlayer;
  calcula(){
    console.log("Player1", this.vidaPlayer1, this.danoPlayer1, this.esquivaPlayer1, this.regenP1);
    console.log("Player2", this.vidaPlayer2, this.danoPlayer2, this.esquivaPlayer2, this.regenP2);

    if (this.esquivaPlayer1!=0 && this.esquivaPlayer2!=0){
      this.danoPlayer1 = 0;
      this.danoPlayer2 = 0;
      this.info1 =  this.nomePlayer1 + " esquivou";
      this.info2 = this.nomePlayer2 + " esquivou";
    }else if (this.danoPlayer1!=0 && this.danoPlayer2!=0){/** player 1  e bot atAca*/
      this.vidaPlayer1 -= this.danoPlayer2;
      this.vidaPlayer2 -= this.danoPlayer1;
      this.info1 =  this.nomePlayer1 + " atacou" + this.danoPlayer1;
      this.info2 = this.nomePlayer2 + " atacou " + this.danoPlayer2;
    }else if (this.danoPlayer1!=0 && this.esquivaPlayer2!=0){/** player 1 ataca e bot esquiva*/
          if (this.esquivaPlayer2 > this.danoPlayer1){
            this.esquivaPlayer2 = 0 ;
            this.danoPlayer1 = 0;
          }
        this.vidaPlayer2 -= this.danoPlayer1 - this.esquivaPlayer2;
        
        if(this.vidaPlayer2<0){
          this.vidaPlayer2 = 0;
        }
        this.info1 =  this.nomePlayer1 + " atacou" + this.danoPlayer1;
        this.info2 = this.nomePlayer2 + " esquivou " +  this.esquivaPlayer2;
      }else if (this.danoPlayer2!=0 && this.esquivaPlayer1!=0){/** player 1 esquiva e bot ataca*/
        if (this.esquivaPlayer1 > this.danoPlayer2){
          this.esquivaPlayer1 = 0 ;
          this.danoPlayer2 = 0;
        }

      this.vidaPlayer1 -= this.danoPlayer2 - this.esquivaPlayer1;
      this.info2 =  this.nomePlayer2 + " atacou" + this.danoPlayer2;
      this.info1 = this.nomePlayer1 + " esquivou " +  this.esquivaPlayer1;
      }
      else if (this.danoPlayer1!=0 && this.regenP2!=0){ /**Player 1 ataca e bot regenera*/
        this.vida2= Number(this.vida2);
        this.vidaPlayer2= this.vida2 - (this.danoPlayer1 - this.regenP2);
        this.info1 =  this.nomePlayer1 + " atacou" + this.danoPlayer1;
        this.info2 = this.nomePlayer2 + " regenerou " +  this.regenP2;
      }
      else if (this.danoPlayer2!=0 && this.regenP1!=0){ /**Player 1 regenera e bot ataca*/
        this.vida1= Number(this.vida1);
        this.vidaPlayer1 = this.vida1 - (this.danoPlayer2 - this.regenP1);
        this.info1 =  this.nomePlayer1 + " regenerou" + this.regenP1;
        this.info2 = this.nomePlayer2 + " ataca " +  this.danoPlayer2;
      } 
      else if (this.esquivaPlayer1!=0 && this.regenP2!=0){ /**Player 1 esquiva  e bot regenera*/
        this.vida2= Number(this.vida2);
        this.vidaPlayer2 = this.vida2 + this.regenP2;
        this.info1 =  this.nomePlayer1 + " esquivou" + this.esquivaPlayer1;
        this.info2 = this.nomePlayer2 + " regenerou " +  this.regenP2;
      }
      else if (this.esquivaPlayer2!=0 && this.regenP1!=0){ /**Player 1 regenera e bot esquiva*/
        this.vida1= Number(this.vida1);
        this.vidaPlayer1 = this.vida1 + this.regenP1;
        this.info1 =  this.nomePlayer1 + " regenerou" + this.regenP1;
        this.info2 = this.nomePlayer2 + " esquivou " +  this.esquivaPlayer2;
      }
      else if (this.regenP2!=0 && this.regenP1!=0){ /**Player 1  e bot regeneram*/
        this.vida1= Number(this.vida1);
        this.vida2= Number(this.vida2);
        this.vidaPlayer1 = this.vida1 + this.regenP1;
        this.vidaPlayer2 = this.vida2 + this.regenP2;
        this.info1 =  this.nomePlayer1 + " regenerou" + this.regenP1;
        this.info2 = this.nomePlayer2 + " regenerou " +  this.regenP2;
       }
    this.danoPlayer1 =0;
    this.danoPlayer2 =0;
    this.esquivaPlayer1 =0;
    this.esquivaPlayer2 = 0;
    this.regenP1 = 0;
    this.regenP2 = 0;

    this.mudaTurno();
  }

  verificarTurno(){
    if(this.verificarPlayer%2 == 0){
    }else{
        this.aleatorio = Math.floor(Math.random() * 3);
        switch(this.aleatorio) { 
          case 0: { 
            this.atacar();
            break; 
          }
          case 1: { 
            this.esquivar();
          break; 
         }
         case 2: { 
          this.regenerar();
          break; 
       } 
    }
  }
  }

}


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicosService } from 'src/app/services/servicos.service';
import { Personagem } from 'src/app/classes/personagem';

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

  vidaPlayer1 :number;
  vidaPlayer1Inicial:number;
  

  vidaPlayer2 :number;
  vidaPlayer2Inicial:number;

  atkPlayer1 :number;
  atkPlayer2 :number;

  intePlayer1 :number;
  intePlayer2 :number;
  
  isMonster;
  isMonster2;

  idPlayer = localStorage.getItem("idPlayer");
  idPersonagem = localStorage.getItem("idPersonagem");

  esquivaPlayer1:number;
  esquivaPlayer2:number;

  ataqueCriticoPlayer1:number;
  ataqueCriticoPlayer2:number;

  recivedata ?: any;
  personagens: Array<Personagem> =[];
  personagemSelecionada:Personagem;

  verificarPlayer:number=0;

  danoPlayer1:number=0;
  danoPlayer2:number=0;


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

  lutar( ){
    if (this.verificarPlayer%2 == 0){
      this.esquivaPlayer2 = Math.floor(Math.random() * (this.intePlayer2/2));     
      if (this.esquivaPlayer2>= ((this.intePlayer2/4) * 3 )){
          alert("Player 2 escapou");
          this.intePlayer2 =  this.intePlayer2 - ((this.intePlayer2) * 0.2);
      }else{
        this.ataqueCriticoPlayer1 = Math.floor(Math.random() * (this.intePlayer1));     
        if (this.ataqueCriticoPlayer1>= ((this.intePlayer1/4) * 3.5 )){
          alert("Dano critico player1");
          this.danoPlayer2 = Math.floor(Math.random() * this.atkPlayer1) + ((this.atkPlayer1) * 0.25);
          this.intePlayer1 =  this.intePlayer1 - ((this.intePlayer1) * 0.1);
        }else{
          this.danoPlayer2 = Math.floor(Math.random() * this.atkPlayer1) ;
        }
        document.getElementById("danoP2").style.display="red";
       
        this.vidaPlayer2 = this.vidaPlayer2 - this.danoPlayer2;
        this.vidaPlayer2Inicial = Number((this.vidaPlayer2*100)/this.vidaPlayer2Inicial);

        setTimeout(() => {
          document.getElementById("danoP2").style.display="transparent";
        }, 2000);

        console.log("gefdjnnuhg", this.vidaPlayer2Inicial);

        if (this.vidaPlayer2<=0){
          alert("player 1 ganhou");
        }else{
          setTimeout(() => {
            this.verificarPlayer=this.verificarPlayer+1;
            this.lutar();
          }, 3500);
        }
      }
    }else{
      this.esquivaPlayer1 = Math.floor(Math.random() * (this.intePlayer1/2));     
      if (this.esquivaPlayer1>= ((this.intePlayer1/4) * 3 )){
          alert("Player 1 escapou");
          this.intePlayer1 =  this.intePlayer1 - ((this.intePlayer1) * 0.2);
      }else{
        this.ataqueCriticoPlayer2 = Math.floor(Math.random() * (this.intePlayer2));     
         if (this.ataqueCriticoPlayer2>= ((this.intePlayer2/4) * 3.5 )){
            alert("Dano critico player2");
            this.danoPlayer1 = Math.floor(Math.random() * this.atkPlayer2) + ((this.atkPlayer2) * 0.25);
            this.intePlayer2 =  this.intePlayer2 - ((this.intePlayer2) * 0.1);
          }else{
            this.danoPlayer1 = Math.floor(Math.random() * this.atkPlayer2);
          }
          document.getElementById("danoP1").style.color="red";
          this.vidaPlayer1 = this.vidaPlayer1 - this.danoPlayer1;
          setTimeout(() => {
            document.getElementById("danoP1").style.color="transparent";
          }, 2000);
          if (this.vidaPlayer1<=0){
            alert("player 2 ganhou");
          }else{
            setTimeout(() => {
              this.verificarPlayer=this.verificarPlayer+1;
              this.lutar();
            }, 3500);
          }
      }
    }
  }
 



}

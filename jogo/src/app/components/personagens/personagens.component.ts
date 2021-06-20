import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicosService } from 'src/app/services/servicos.service';
import { Personagem } from 'src/app/classes/personagem';

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

item:number=0;

  recivedata ?: any;
  arrayPersonagens : Array<Personagem> =[];



receberPersonagem() {
  this.service.receberPersonagem(this.service.id).subscribe( 
    (data) => {
        this.recivedata = data;
        console.log(this.recivedata['data'].Personagens);
        if(this.recivedata['code'] == 200){
          this.arrayPersonagens = this.recivedata['data'].Personagens.map(( x: any) => new Personagem(x) )
        }else{
          alert("Erro");
        } 
        console.log(this.arrayPersonagens[1].name);

        for (let item of this.arrayPersonagens) {
          console.log(item);
        }
  });
}
 
  indexPersonagem:number;
 

  ataquezinho;
  vidazinha;
  inteligenciazinha;

  mudarStats(event){
    this.indexPersonagem = event.target.value;
    console.log(this.indexPersonagem);
    this.ataquezinho = this.arrayPersonagens[this.indexPersonagem].ataque;
    this.vidazinha = this.arrayPersonagens[this.indexPersonagem].vida;
    this.inteligenciazinha = this.arrayPersonagens[this.indexPersonagem].Inteligencia;
  }

}



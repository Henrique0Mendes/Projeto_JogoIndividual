import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicosService } from 'src/app/services/servicos.service';

@Component({
  selector: 'app-personagens',
  templateUrl: './personagens.component.html',
  styleUrls: ['./personagens.component.css']
})
export class PersonagensComponent implements OnInit {

  constructor(private service: ServicosService, router:Router) { 
    this.router = router;
  }

  ngOnInit(): void {
    this.receberPersonagem();
  }

  router: Router;
  name;
  idPersonagem;
  ataque;
  isMonster;
  Inteligencia;
  vida;
  idPlayer;

   personagens: Array<any> = ['Apple', 2, 'Orange', 3, 4, 'Banana']; 


  receberPersonagem() {
    this.service.receberPersonagem(this.service.id).subscribe((x) => {
      if (x['code'] == 200) {

        this.name = x['data'].Personagens[0].Nome;
        this.idPersonagem = x['data'].Personagens[0].ID;
        this.ataque = x['data'].Personagens[0].Atk;
        this.isMonster = x['data'].Personagens[0].IsMonset;
        this.Inteligencia = x['data'].Personagens[0].Int;
        this.vida = x['data'].Personagens[0].Vida;
        this.idPlayer = x['data'].Personagens[0].ID_Player;
      } 
    });
  }

}

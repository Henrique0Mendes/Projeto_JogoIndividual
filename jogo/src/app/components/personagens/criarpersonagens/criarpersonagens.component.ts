import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicosService } from 'src/app/services/servicos.service';


@Component({
  selector: 'app-criarpersonagens',
  templateUrl: './criarpersonagens.component.html',
  styleUrls: ['./criarpersonagens.component.css']
})
export class CriarpersonagensComponent implements OnInit {

  constructor(private service: ServicosService, router:Router) { 
    this.router = router;

  }

  ngOnInit(): void {

  }

  fotoPers:string="../../../assets/imagens/hunter.png";
   
  mudaPersonagem(tipo){
      if (tipo.value == "true"){
        this.fotoPers="../../../assets/imagens/monster.png";
      }else{
        this.fotoPers="../../../assets/imagens/hunter.png";
      }
  }

  router: Router;

   username = localStorage.key(0);
   password = localStorage.getItem(this.username);


  criar(nomePers, ataque, tipo, inteligencia, vida, erroPers){
  this.service.criarPersonagem(nomePers, ataque, tipo, inteligencia, vida,this.username, this.password).subscribe((x) => {
        if (x['code'] == 200 ){
          this.router.navigate(['/Personagens']);
          console.log(x);
        }else{
          erroPers.style.display="block";
        }
      }
      );
  } 

}
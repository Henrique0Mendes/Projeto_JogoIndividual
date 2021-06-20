import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicosService } from 'src/app/services/servicos.service';

@Component({
  selector: 'app-criar-arma',
  templateUrl: './criar-arma.component.html',
  styleUrls: ['./criar-arma.component.css']
})
export class CriarArmaComponent implements OnInit {

  constructor(private service: ServicosService, router:Router) { 

  }

  ngOnInit(): void {
  }

  foto:string="../../../assets/imagens/machado.png";
   
  mudaArma(tipo){
      if (tipo.value == 0){
        this.foto="../../../../assets/imagens/machado.png";
      } else if (tipo.value == 1){
        this.foto="../../../../assets/imagens/cutelo.png";
      }else if (tipo.value == 2){
        this.foto="../../../assets/imagens/pistol.png";
      }else if (tipo.value == 3){
        this.foto="../../../assets/imagens/espada.png";
      }
  }

  router: Router;

  /* criarArma(nome:any, ataque:any,durabilidade:any, tipo:any, vida:any){
   let username = localStorage.key(0);
   let password = localStorage.getItem(username);

    this.service.criarPersonagem(nome, ataque, tipo, durabilidade, vida, username, password).subscribe(
      (x) => {console.log(x['data']);}
      );
      this.service.criarPersonagem(nome, ataque, tipo, durabilidade, vida,username, password).subscribe((x) => {
        if (x['code'] == 200 ){
          this.router.navigate(['/Personagens']);
          console.log(x);
        }else{
          alert("erro");
        }
      }
      );
  } 

 */

}

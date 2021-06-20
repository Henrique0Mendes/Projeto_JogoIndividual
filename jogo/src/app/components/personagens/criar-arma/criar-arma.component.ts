import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicosService } from 'src/app/services/servicos.service';


@Component({
  selector: 'app-criar-arma',
  templateUrl: './criar-arma.component.html',
  styleUrls: ['./criar-arma.component.css']
})


export class CriarArmaComponent implements OnInit {
  
  constructor(private service: ServicosService, router:Router  ) { 
    this.router = router;
  }
  router:Router;

  ngOnInit(): void {
  }

  foto:string="../../../assets/imagens/machado.png";

  username = localStorage.key(0);
  password = localStorage.getItem(this.username);
  idPersonagem = localStorage.getItem("idPersonagem");


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

  criarArma(nome, ataque,  durabilidade, vida, erroArma){
    this.service.criarArma(nome, ataque, durabilidade, vida, this.username, this.password, this.idPersonagem).subscribe((x) => {
          if (x['code'] == 200 ){
            this.router.navigate(['/Personagens']);
            console.log(x);
          }else{
            erroArma.style.display="block";
          }
        }
        );
    } 

    
    
 

}

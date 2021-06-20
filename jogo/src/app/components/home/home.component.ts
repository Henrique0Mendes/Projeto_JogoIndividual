import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal , NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ServicosService } from 'src/app/services/servicos.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbModalConfig, NgbModal, NgbActiveModal]
})

export class HomeComponent implements OnInit {

  constructor(private service: ServicosService, router:Router ,config: NgbModalConfig, private modalService: NgbModal ) {
    this.router = router;
    config.backdrop = 'static';
    config.keyboard = false;
  }
  
  open(content) {
    this.modalService.open(content);
  }

  openModalCriar(content1) {
    this.modalService.open(content1);
  }

  ngOnInit(): void {
  }
  
  
  router: Router;

  login(user:any , pass:any, content, erro) {
  this.service.login(user, pass).subscribe(
      (x) => {console.log(x['data']);}
      );
      this.service.login(user, pass).subscribe((x) => {
        if (x['code'] == 200 ){
          this.router.navigate(['/Personagens'])
          console.log(x);
          this.service.id = x['data'];
          localStorage.setItem("idPlayer",this.service.id);
          this.modalService.dismissAll(content);
        } else{
          erro.style.display="block";
        }
      }
      );
  }

  criarUtilizador(user:any , pass:any, content1, erroCriar) {
    this.service.criarUtilizador(user, pass).subscribe(
        (x) => {console.log(x['data']);}
        );
        this.service.criarUtilizador(user, pass).subscribe((x) => {
          if (x['code'] == 200 ){
            this.router.navigate(['/Personagens'])
            console.log(x);
            this.modalService.dismissAll(content1);
          }else{
            erroCriar.style.display="block";
          }
        }
        );
    }



}

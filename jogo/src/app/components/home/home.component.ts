import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/services/servico.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbModalConfig, NgbModal]
})

export class HomeComponent implements OnInit {

  constructor(private loginService: LoginService, router:Router,config: NgbModalConfig, private modalService: NgbModal ) {
    this.router = router;
    config.backdrop = 'static';
    config.keyboard = false;
  }
  
  open(content) {
    this.modalService.open(content);
  }

  ngOnInit(): void {

  }
  
  router: Router;

  login(user:any , pass:any) {
  this.loginService.login(user, pass).subscribe(
      (x) => {console.log(x['data']);}
      );
      this.loginService.login(user, pass).subscribe((x) => {
        if (x['code'] == 200 ){
          this.router.navigate(['/game'])
          console.log(x);

        } else{
          alert("Login Invalido")
        }

      }
      );
  }
}

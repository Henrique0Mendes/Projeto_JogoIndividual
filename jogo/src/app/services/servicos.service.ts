import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServicosService {

   constructor (private http: HttpClient) {
  }

    linkLogin: string = "http://moreiramoises.pt/server/apis/login.php";

    linkCriarRegisto:string = "http://moreiramoises.pt/server/apis/signup.php";

    LinkCriarPersonagem:string = "http://moreiramoises.pt/server/apis/createChart.php";

    linkReceberPersonagem: string = 'http://moreiramoises.pt/server/apis/get/getChar.php?PlayerID=';

    linkReceberArma: string = 'http://moreiramoises.pt/server/apis/get/getArma.php?IDPersonagem=';
    
    linkCriarArma: string = 'http://moreiramoises.pt/server/apis/createArma.php';

    linkReceberPersonagemAleatoria: string = ' http://moreiramoises.pt/server/apis/get/getRandomChar.php?';

    linkUpdate: string = ' http://moreiramoises.pt/server/apis/updateChart.php';

    id;
    user;
    pass;

  login(nome, pass){
    let data: FormData = new FormData();
    data.append("username", nome);
    data.append("password", pass);
    localStorage.clear();
    localStorage.setItem("nome",nome);
    localStorage.setItem("pass",pass);
    return this.http.post(this.linkLogin, data);
  }

  criarUtilizador(nome:any, pass:any){
    let data:FormData = new FormData();
    data.append("username", nome);
    data.append("password", pass);
    return this.http.post(this.linkCriarRegisto, data);
  }

  criarPersonagem(nomePers, ataque, tipo, inteligencia, vida, username, password){
    let data:FormData = new FormData();
    data.append("name", nomePers);
    data.append("atk", ataque);
    data.append("isMonster", tipo);
    data.append("int", inteligencia);
    data.append("vida", vida);
    data.append("username", username);
    data.append("password", password); 
    return this.http.post(this.LinkCriarPersonagem, data);
  }

  receberPersonagem(id) {
    return this.http.get(this.linkReceberPersonagem + id);
  }

  receberArma(id) {
    return this.http.get(this.linkReceberArma + id);
  }

  
  criarArma(nome, ataque, tipo, durabilidade, username, password, idPersonagem){
    let data:FormData = new FormData();
    data.append("name", nome);
    data.append("atk", ataque);
    data.append("durabilidade", durabilidade);
    data.append("tipoDeArma", tipo);
    data.append("vida", null);
    data.append("username", username);
    data.append("password", password); 
    data.append("idPersonagem", idPersonagem); 
    return this.http.post(this.linkCriarArma, data);
  }

  receberPersonagemAleatoria() {
    return this.http.get(this.linkReceberPersonagemAleatoria);
  }
  

   upgrade(idPersonagem, nome, ataque, isMonster,  inteligencia, vida, utilizador, pass){
    console.log(idPersonagem, nome, ataque, isMonster, inteligencia, vida, utilizador,pass);

    let data: FormData = new FormData();
    data.append("idChar", idPersonagem);
    data.append("name", nome);
    data.append("atk", ataque);
    data.append("isMonster", "true");
    data.append("int", inteligencia);
    data.append("vida", vida);
    data.append("username",utilizador );
    data.append("password",pass );
    return this.http.post(this.linkUpdate,data);
  } 


}

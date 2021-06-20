import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AttrAst } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {

   constructor (private http: HttpClient) {
  }

  linkLogin: string = "http://moreiramoises.pt/server/apis/login.php";

  linkCriarRegisto = "http://moreiramoises.pt/server/apis/signup.php";

  LinkCriarPersonagem:string = "http://moreiramoises.pt/server/apis/createChart.php";

  linkReceberPersonagem: string = 'http://moreiramoises.pt/server/apis/get/getChar.php?PlayerID=';


  id:number;

   
  login(nome:any, pass:any){
    let data: FormData = new FormData();
    data.append("username", nome);
    data.append("password", pass);
    localStorage.clear();
    localStorage.setItem(nome,pass);
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



}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {

  constructor(private http: HttpClient) { }

  linkLogin: string = "http://moreiramoises.pt/server/apis/login.php";
  linkCriarRegisto = "http://moreiramoises.pt/server/apis/signup.php";
  LinkCriarPersonagem = "http://moreiramoises.pt/server/apis/createChart.php";


  login(nome:any, pass:any){
    let data: FormData = new FormData();
    data.append("username", nome);
    data.append("password", pass);
    return this.http.post(this.linkLogin, data);
  }
  
  criarUtilizador(nome:any, pass:any){
    let data:FormData = new FormData();
    data.append("username", nome);
    data.append("password", pass);
    return this.http.post(this.linkCriarRegisto, data);
  }

  criarPersonagem(){
    let datToSend:FormData = new FormData();
    datToSend.append("name", "SouLindo");
    datToSend.append("atk", "10");
    datToSend.append("isMonster", "false");
    datToSend.append("int", "10");
    datToSend.append("vida", "10");
    datToSend.append("idPlayer", "76");
    return this.http.post(this.LinkCriarPersonagem, datToSend);
  }

}

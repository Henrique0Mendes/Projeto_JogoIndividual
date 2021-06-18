import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  link: string = "http://moreiramoises.pt/server/apis/login.php";


  login(nome:any, pass:any){
    let data: FormData = new FormData();
    data.append("username", nome);
    data.append("password", pass);

    return this.http.post(this.link, data);
  }


}
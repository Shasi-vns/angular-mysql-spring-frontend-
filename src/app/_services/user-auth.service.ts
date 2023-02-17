import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRole(role:string){
    localStorage.setItem("role",role);
  }

  public setName(name:string){
    localStorage.setItem("name",name);
  }

  public getName(): any{
    return localStorage.getItem("name");
  }

  public getRole(): any{
    return localStorage.getItem("role");
  }

  public setToken(jwtToken:string){
    localStorage.setItem("jwtToken",jwtToken);
  }

  public getToken() : any{
    return localStorage.getItem("jwtToken");
  }

  public clear(){
    localStorage.clear();
  }

  public isLoggedIn(){
    return this.getRole() && this.getToken();
  }


}

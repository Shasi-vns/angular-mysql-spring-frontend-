import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OauthUserServiceService {
  PATH_OF_API = "http://localhost:8080";
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });


  constructor(
    private httpclient : HttpClient,
    private router: Router,
    
  ) { }

public Oauth(){
  //window.location.href='/oauth2/authorization/google';
  //return this.httpclient.get(this.PATH_OF_API+'/dashboard',{headers:this.requestHeader});
}


}

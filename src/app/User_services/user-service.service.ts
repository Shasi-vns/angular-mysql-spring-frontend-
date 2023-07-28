import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from '../_services/user-auth.service';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  
  PATH_OF_API = "http://localhost:8080";
  head_obj = new HttpHeaders().set("Authorization",this.userAuthSer.getToken());

  constructor(private http : HttpClient, private userAuthSer:UserAuthService) { }

  public getUsers():Observable<User[]>{
      
    return this.http.get<User[]>(`${this.PATH_OF_API}/users`,{headers:this.head_obj});
}

public addUser(user:User): Observable<User> {
  return this.http.post<User>(`${this.PATH_OF_API}/addUser`, user,{headers:this.head_obj});
}

public selfRegister(user:User): Observable<User> {
  return this.http.post<User>(`${this.PATH_OF_API}/selfRegister`, user);
}

public updateUser(user:User): Observable<User> {
  return this.http.put<User>(`${this.PATH_OF_API}/editUser`, user,{headers:this.head_obj});
}

public deleteUser(Id: number): Observable<void> {
  return this.http.delete<void>(`${this.PATH_OF_API}/deleteUser/${Id}`,{headers:this.head_obj});
}




}

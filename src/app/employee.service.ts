import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { environment } from 'src/environments/environment';
import { UserAuthService } from './_services/user-auth.service';
@Injectable({
    providedIn:'root'
})
export class EmployeeService{
    private apiServerUrl=environment.apiBaseUrl;
    head_obj = new HttpHeaders().set("Authorization",this.userAuthSer.getToken());

   // requestHeader = new HttpHeaders({ "Authorization": this.userAuthSer.getToken() });

    constructor(private http: HttpClient,
      private userAuthSer: UserAuthService
      ){}



    public getEmployees():Observable<Employee[]>{

        return this.http.get<Employee[]>(`${this.apiServerUrl}/employee`,{headers:this.head_obj});
    }

    public getEmployeeById(Id:number):Observable<Employee>{

            return this.http.get<Employee>(`${this.apiServerUrl}/employee/${Id}`,{headers:this.head_obj});
        }




    public addEmployee(employee: Employee): Observable<Employee> {
        return this.http.post<Employee>(`${this.apiServerUrl}/addEmp`, employee,{headers:this.head_obj});
      }

      public updateEmployee(employee: Employee): Observable<Employee> {
        return this.http.put<Employee>(`${this.apiServerUrl}/editEmp`, employee,{headers:this.head_obj});
      }

      public deleteEmployee(Id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/delEmp/${Id}`,{headers:this.head_obj});
      }





}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OauthUserServiceService } from '../OauthService/oauth-user-service.service';

import { User } from '../User_services/User';
import { UserServiceService } from '../User_services/user-service.service';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public fieldTextType: boolean = false;

  constructor(
    private toastr: ToastrService,
    private userService:UserService,
    private router: Router, 
    private userAuthSer:UserAuthService,
    private userSerReg:UserServiceService,
    private OauthSer:OauthUserServiceService
    ) { }

  ngOnInit(): void {
  }
  login(loginForm : NgForm){
    console.log(loginForm.value);
this.userService.login(loginForm.value).subscribe(
{
  next:(response:any)=>{

    // this.toastr.info('User details verified successfully','Login',{timeOut: 3000});
    // console.log(response.jwtToken);
    // console.log(response.user.role);
    // console.log(response.user.name);
    this.userAuthSer.setRole(response.user.role);
    this.userAuthSer.setToken(response.jwtToken);
    this.userAuthSer.setName(response.user.name);
    this.router.navigate(["/main"]);
  },
  error:(error:HttpErrorResponse)=> {
    this.toastr.error('Invalid User details','Login',{timeOut: 1500})
    }
  });
}

public onAddEmployee(addForm: NgForm):void{
  document.getElementById('add-employee-form')?.click();
  this.userSerReg.selfRegister(addForm.value).subscribe(
    { next : (response:User)=> {
      this.toastr.success('User Registered Successfully','Registration',{timeOut: 3000})
      },
     error :(error:HttpErrorResponse)=>{
      this.toastr.error(error.message,'Registration Failed',{timeOut: 3000})
      },
    complete:()=>addForm.reset()
});
}

public Oauth(){
  this.router.navigateByUrl('/oauth2/authorization/google')
  this.OauthSer.Oauth();
}

public toggleFieldTextType() {
  this.fieldTextType = !this.fieldTextType;
}

public onOpenModal(user:User | any, mode:any):void{
  const container=document.getElementById('main-container');
  const button = document.createElement('button');
  button.type='button';
  button.style.display='none';
  button.setAttribute('data-toggle','modal');
  if(mode === 'add'){
    button.setAttribute('data-target','#addEmployeeModal');
  }
  container?.appendChild(button);
  button.click();

}



}

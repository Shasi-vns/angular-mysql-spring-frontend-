import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService:UserService,private router: Router, private userAuthSer:UserAuthService) { }

  ngOnInit(): void {
  }
  login(loginForm : NgForm){
    //console.log(loginForm.value);
this.userService.login(loginForm.value).subscribe(
  (response:any)=>{console.log(response.jwtToken);
    console.log(response.user.role);
    console.log(response.user.name);
    this.userAuthSer.setRole(response.user.role);
    this.userAuthSer.setToken(response.jwtToken);
    this.userAuthSer.setName(response.user.name);
    this.router.navigate(["/main"]);
  },
  (error)=>{console.log(error);alert("Invalid User Details");}
)
}

}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../User_services/User';
import { UserServiceService } from '../User_services/user-service.service';


@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent implements OnInit {
  public user: User[] = [];
  public editUser:User | any;
  public deleteUser:User | any;
  public userName : string | any;
  public fieldTextType: boolean = false;
  public p:number=1;
  public itemsPerPage=8;
  public totalCards:any;

  constructor(
    private userSer:UserServiceService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.getUsers();
  
  }

  //same employee functions are used for user crud without changing functions name

  public getUsers():void{
    this.userSer.getUsers().subscribe({
      next:(response:User[])=>{this.user=response,this.totalCards=response.length,console.log(response.values)},
      error : (error:HttpErrorResponse)=>console.log(error.message),
      complete:() => console.log("heello")
    });
  }

  public toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  public onAddEmployee(addForm: NgForm):void{
    document.getElementById('add-employee-form')?.click();
    this.userSer.addUser(addForm.value).subscribe(
      { next : (response:User)=> {this.toastr.success('User added successfully','Record Added',{timeOut: 1500}),this.getUsers()},
       error :(error:HttpErrorResponse)=>this.toastr.error(error.message,'Record Additon Failed',{timeOut: 1500}),
      complete:()=>addForm.reset()
  });
  }
   
  public onUpdateEmployee(user: User):void{
    this.userSer.updateUser(user).subscribe(
      {next: (response:User)=>{this.toastr.success('User updated successfully','Record Update',{timeOut: 1500}),this.getUsers()},
      error : (error:HttpErrorResponse)=>this.toastr.error(error.message,'Record Update Failed',{timeOut: 1500}),
      // complete:()=>console.log("")
      });
  }

  public onDeleteEmployee(userId: number):void{
   
    this.userSer.deleteUser(userId).subscribe(
     {next: (response:void)=> {this.toastr.success('User deleted successfully','Record Delete',{timeOut: 1500}),this.getUsers()},
      error: (error:HttpErrorResponse)=>this.toastr.error(error.message,'Record Deletion Failed',{timeOut: 1500}),
      // complete:()=>console.log("")
  });
  }


  public searchUsers(key:string):void{
    const result:User[]=[];
    console.log(key);
    for (const u of this.user){
      if (u.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || u.mobile.toString().indexOf(key) !== -1
      ||u.username.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ||u.id.toString().indexOf(key) !== -1
      ) {
        result.push(u);
      }
    }
    this.user=result;
    if (result.length === 0 || !key){
      this.getUsers();
    }
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
  if(mode === 'edit'){
    this.editUser=user;
    button.setAttribute('data-target','#updateEmployeeModal');
  }
  if(mode === 'delete'){
    this.deleteUser=user;
    button.setAttribute('data-target','#deleteEmployeeModal');
  }

  container?.appendChild(button);
  button.click();

}
}

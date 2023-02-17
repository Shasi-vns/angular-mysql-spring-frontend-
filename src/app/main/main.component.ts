import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public employee: Employee[] = [];
  public editEmployee:Employee | any;
  public deleteEmployee:Employee | any;
  
  constructor (private employeeService: EmployeeService, private userAuthSer:UserAuthService){}

  ngOnInit(): void {
    this.getEmployees();
    this.isLoggedIn();
  }

  public isLoggedIn(){
    return this.userAuthSer.isLoggedIn();
  }


  public getEmployees():void{
    this.employeeService.getEmployees().subscribe(
     { next : (response: Employee[])=> {this.employee=response,console.log(response.values)},
      error : (error:HttpErrorResponse)=> alert(error.message),
      complete:() => console.log("heello")
    });
  }

  public onAddEmployee(addForm: NgForm):void{
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      { next : (response:Employee)=> this.getEmployees(),
       error :(error:HttpErrorResponse)=>alert(error.message),
      complete:()=>addForm.reset()
  });
  }

  public onUpdateEmployee(employee: Employee):void{
    this.employeeService.updateEmployee(employee).subscribe(
      {next: (response:Employee)=>this.getEmployees(),
      error : (error:HttpErrorResponse)=>console.log(error.message),
      complete:()=>console.log("")
      });
  }

  public onDeleteEmployee(employeeId: number):void{
   
    this.employeeService.deleteEmployee(employeeId).subscribe(
     {next: (response:void)=> this.getEmployees(),
      error: (error:HttpErrorResponse)=>alert(error.message),
      complete:()=>console.log("")
  });
  }

  public searchEmployees(key:string):void{
    const result:Employee[]=[];
    console.log(key);
    for (const employee of this.employee){
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ||employee.department.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ||employee.id.toString().indexOf(key) !== -1
      ) {
        result.push(employee);
      }
    }
    this.employee=result;
    if (result.length === 0 || !key){
      this.getEmployees();
    }
  }


public onOpenModal(employee:Employee | any,mode:any):void{
  const container = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type='button';
  button.style.display='none';
  button.setAttribute('data-toggle','modal');
  if(mode === 'add'){
    button.setAttribute('data-target','#addEmployeeModal');
  }
  if(mode === 'edit'){
    this.editEmployee=employee;
    button.setAttribute('data-target','#updateEmployeeModal');
  }
  if(mode === 'delete'){
    this.deleteEmployee=employee;
    button.setAttribute('data-target','#deleteEmployeeModal');
  }

container?.appendChild(button);
button.click();
}

}

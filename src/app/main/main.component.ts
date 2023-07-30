import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { UserAuthService } from '../_services/user-auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  public employee: Employee[] = [];
  public editEmployee: Employee | any;
  public deleteEmployee: Employee | any;
  public userName: string | any;
  public p: number = 1;
  public itemsPerPage = 8;
  public totalCards: any;

  constructor(
    private toastr: ToastrService,
    private employeeService: EmployeeService,
    private userAuthSer: UserAuthService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
    this.isLoggedIn();
    this.userName = this.userAuthSer.getName();
  }

  public isLoggedIn() {
    return this.userAuthSer.isLoggedIn();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (response: Employee[]) => {
        (this.employee = response),
          (this.totalCards = response.length),
          console.log(response.values);
      },
      error: (error: HttpErrorResponse) => alert(error.message),
      complete: () => console.log('heello'),
    });
  }

  public editEmployeeById(Id:number){
    this.employeeService.getEmployeeById(Id).subscribe({
    next:(response:Employee)=>{
    (this.editEmployee=response),console.log(response);
    },
    error:(error:HttpErrorResponse)=>alert(error.message),
    });
    }

  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe({
      next: (response: Employee) => {
        this.toastr.success('Employee added successfully', 'Record Added', {
          timeOut: 1500,
        }),
          this.getEmployees();
      },
      error: (error: HttpErrorResponse) =>
        this.toastr.error(error.message, 'Record Additon Failed', {
          timeOut: 1500,
        }),
      complete: () => addForm.reset(),
    });
  }

  public onUpdateEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe({
      next: (response: Employee) => {
        this.toastr.info('Employee updated successfully', 'Record Update', {
          timeOut: 1500,
        }),
          this.getEmployees();
      },
      error: (error: HttpErrorResponse) =>
        this.toastr.error(error.message, 'Record Update Failed', {
          timeOut: 1500,
        }),
      // complete:()=>console.log("")
    });
  }

  public onDeleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe({
      next: (response: void) => {
        this.toastr.success('Employee Deleted successfully', 'Record Delete', {
          timeOut: 1500,
        }),
          this.getEmployees();
      },
      error: (error: HttpErrorResponse) =>
        this.toastr.error(error.message, 'Record Deletion Failed', {
          timeOut: 1500,
        }),
      // complete:()=>console.log("")
    });
  }

  public searchEmployees(key: string): void {
    const result: Employee[] = [];
    console.log(key);
    for (const employee of this.employee) {
      if (
        employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.department.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.id.toString().indexOf(key) !== -1
      ) {
        result.push(employee);
      }
    }
    this.employee = result;
    if (result.length === 0 || !key) {
      this.getEmployees();
    }
  }


  public onOpenModal(employee: Employee | number | any, mode: any): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      if (this.userAuthSer.getRole() === 'ADMIN') {
        this.editEmployeeById(employee);
        button.setAttribute('data-target', '#updateEmployeeModal');
      } else {
        this.toastr.warning('You Dont have access', 'Updation', {
          timeOut: 1500,
        });
      }
    }
    if (mode === 'delete') {
      if (this.userAuthSer.getRole() === 'ADMIN') {
        this.deleteEmployee = employee;
        button.setAttribute('data-target', '#deleteEmployeeModal');
      } else {
        this.toastr.warning('You Dont have access', 'Deletion', {
          timeOut: 1500,
        });
      }
    }

    container?.appendChild(button);
    button.click();
  }
}

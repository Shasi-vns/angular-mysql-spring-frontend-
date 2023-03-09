import {NgModule} from '@angular/core';
import {Routes, RouterModule} from  '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { UserComponentComponent } from './user-component/user-component.component';

const routes : Routes = [
    {path:'login',component:LoginComponent},
    {path:'main',component:MainComponent},
    {path:'userpage',component:UserComponentComponent}
];

@NgModule({
        imports:[RouterModule.forRoot(routes)],
        exports:[RouterModule] 
    })
    export class AppRoutingModule {}
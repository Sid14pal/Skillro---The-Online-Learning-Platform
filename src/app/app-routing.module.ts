import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './dashboard/register/register.component';
import { LoginComponent } from './dashboard/login/login.component';
import { TestDashComponent } from './dashboard/test-dash/test-dash.component';

const routes: Routes = [

  
  {path: 'register', component : RegisterComponent},
  {path: 'login', component : LoginComponent},
  {path: 'test-dash', component : TestDashComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

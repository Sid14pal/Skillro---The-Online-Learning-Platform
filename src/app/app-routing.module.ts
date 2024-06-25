import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './dashboard/register/register.component';
import { LoginComponent } from './dashboard/login/login.component';
import { ForgotPasswordComponent } from './dashboard/forgot-password/forgot-password.component';
import { VarifyEmailComponent } from './dashboard/varify-email/varify-email.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

const routes: Routes = [

  
  {path: 'register', component : RegisterComponent},
  {path: 'login', component : LoginComponent},
  {path: 'forgot-password', component : ForgotPasswordComponent},
  {path: 'varify-email', component : VarifyEmailComponent},
  {path: 'dashboard', component : DashboardComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

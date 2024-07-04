import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './dashboard/register/register.component';
import { LoginComponent } from './dashboard/login/login.component';
import { ForgotPasswordComponent } from './dashboard/forgot-password/forgot-password.component';
import { VarifyEmailComponent } from './dashboard/varify-email/varify-email.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AddStudentComponent } from './dashboard/add-student/add-student.component';
import { AllStudentsComponent } from './dashboard/all-students/all-students.component';

const routes: Routes = [

  
  {path: 'register', component : RegisterComponent},
  {path: 'login', component : LoginComponent},
  {path: 'forgot-password', component : ForgotPasswordComponent},
  {path: 'varify-email', component : VarifyEmailComponent},
  {path: 'dashboard', component : DashboardComponent},
  {path: 'add-student', component : AddStudentComponent},
  {path: 'all-student', component : AllStudentsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

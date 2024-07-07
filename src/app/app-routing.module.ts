import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './dashboard/register/register.component';
import { LoginComponent } from './dashboard/login/login.component';
import { ForgotPasswordComponent } from './dashboard/forgot-password/forgot-password.component';
import { VarifyEmailComponent } from './dashboard/varify-email/varify-email.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AllStudentsComponent } from './dashboard/all-students/all-students.component';
import { AddStudentsComponent } from './dashboard/add-students/add-students.component';
import { TestImageUploadComponent } from './dashboard/test-image-upload/test-image-upload.component';

const routes: Routes = [

  
  {path: 'register', component : RegisterComponent},
  {path: 'login', component : LoginComponent},
  {path: 'forgot-password', component : ForgotPasswordComponent},
  {path: 'varify-email', component : VarifyEmailComponent},
  {path: 'dashboard', component : DashboardComponent},
  {path: 'add-student', component : AddStudentsComponent},
  {path: 'all-student', component : AllStudentsComponent},
  {path: 'test-image-upload', component : TestImageUploadComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

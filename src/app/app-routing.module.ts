import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './dashboard/register/register.component';
import { LoginComponent } from './dashboard/login/login.component';
import { ForgotPasswordComponent } from './dashboard/forgot-password/forgot-password.component';
import { VarifyEmailComponent } from './dashboard/varify-email/varify-email.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { EditStudentComponent } from './dashboard/edit-student/edit-student.component';
import { AboutStudentComponent } from './dashboard/about-student/about-student.component';
import { AddCoursesComponent } from './dashboard/add-courses/add-courses.component';
import { HomeComponent } from './template/home/home.component';
import { CoursesComponent } from './template/courses/courses.component';
import { AllCoursesComponent } from './dashboard/all-courses/all-courses.component';
import { CourseDetailsComponent } from './template/course-details/course-details.component';

const routes: Routes = [

  {path: '', component : HomeComponent},
  {path: 'register', component : RegisterComponent},
  {path: 'login', component : LoginComponent},
  {path: 'forgot-password', component : ForgotPasswordComponent},
  {path: 'varify-email', component : VarifyEmailComponent},
  {path: 'dashboard', component : DashboardComponent},
  {path: 'edit-student/:id', component : EditStudentComponent},
  {path: 'about-student', component : AboutStudentComponent},
  {path: 'add-courses', component : AddCoursesComponent},
  {path: 'courses', component : CoursesComponent},
  {path: 'all-courses', component : AllCoursesComponent},
  {path: 'course-details', component : CourseDetailsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

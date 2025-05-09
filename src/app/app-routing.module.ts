import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './dashboard/register/register.component';
import { LoginComponent } from './dashboard/login/login.component';
import { ForgotPasswordComponent } from './dashboard/forgot-password/forgot-password.component';
import { VarifyEmailComponent } from './dashboard/varify-email/varify-email.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AboutStudentComponent } from './dashboard/about-student/about-student.component';
import { AddCoursesComponent } from './dashboard/add-courses/add-courses.component';
import { HomeComponent } from './template/home/home.component';
import { AllCoursesComponent } from './dashboard/all-courses/all-courses.component';
import { CourseDetailsComponent } from './template/course-details/course-details.component';
import { CourseListComponent } from './template/course-list/course-list.component';
import { AboutUsComponent } from './template/about-us/about-us.component';
import { CoursesComponent } from './template/courses/courses.component';
import { BlogComponent } from './template/blog/blog.component';
import { ContactUsComponent } from './template/contact-us/contact-us.component';
import { StudentDashboardComponent } from './dashboard/student-dashboard/student-dashboard.component';
import { EnrolledCoursesComponent } from './dashboard/enrolled-courses/enrolled-courses.component';
import { StudentOrderHistoryComponent } from './dashboard/student-order-history/student-order-history.component';

const routes: Routes = [

  {path: '', component : HomeComponent},
  {path: 'register', component : RegisterComponent},
  {path: 'login', component : LoginComponent},
  {path: 'forgot-password', component : ForgotPasswordComponent},
  {path: 'varify-email', component : VarifyEmailComponent},
  {path: 'dashboard', component : DashboardComponent},
  {path: 'student-dashboard', component : StudentDashboardComponent},
  {path: 'enrolled-courses', component : EnrolledCoursesComponent},
  {path: 'student-order-history', component : StudentOrderHistoryComponent},
  {path: 'about-student', component : AboutStudentComponent},
  {path: 'add-courses', component : AddCoursesComponent},
  {path: 'all-courses', component : AllCoursesComponent},
  {path: 'course-details', component : CourseDetailsComponent},
  {path: 'course-list', component : CourseListComponent},
  {path: 'about-us', component : AboutUsComponent},
  {path: 'courses', component : CoursesComponent},
  {path: 'blog', component : BlogComponent},
  {path: 'contact-us', component : ContactUsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

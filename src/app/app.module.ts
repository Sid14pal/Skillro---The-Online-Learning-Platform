import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, withFetch, provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire/compat';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './dashboard/register/register.component';
import { LoginComponent } from './dashboard/login/login.component';
import { environment } from '../environments/environment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderComponent } from './template/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ForgotPasswordComponent } from './dashboard/forgot-password/forgot-password.component';
import { VarifyEmailComponent } from './dashboard/varify-email/varify-email.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AllStudentsComponent } from './dashboard/all-students/all-students.component';
import { DashboardSidebarComponent } from './dashboard/dashboard-sidebar/dashboard-sidebar.component';
import { AddStudentsComponent } from './dashboard/add-students/add-students.component';
import { EditStudentComponent } from './dashboard/edit-student/edit-student.component';
import { DashboardHeaderComponent } from './dashboard/dashboard-header/dashboard-header.component';
import { AboutStudentComponent } from './dashboard/about-student/about-student.component';
import { AddCoursesComponent } from './dashboard/add-courses/add-courses.component';
import { BannerComponent } from './template/banner/banner.component';
import { HomeComponent } from './template/home/home.component';
import { BenefitsComponent } from './template/benefits/benefits.component';
import { ServicesComponent } from './template/services/services.component';
import { CoursesComponent } from './template/courses/courses.component';
import { GalleryComponent } from './template/gallery/gallery.component';
import { AllCoursesComponent } from './dashboard/all-courses/all-courses.component';
import { TestimonialComponent } from './template/testimonial/testimonial.component';
import { FeaturedCoursesComponent } from './template/featured-courses/featured-courses.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    ForgotPasswordComponent,
    VarifyEmailComponent,
    DashboardComponent,
    AllStudentsComponent,
    DashboardSidebarComponent,
    AddStudentsComponent,
    EditStudentComponent,
    DashboardHeaderComponent,
    AboutStudentComponent,
    AddCoursesComponent,
    BannerComponent,
    HomeComponent,
    BenefitsComponent,
    ServicesComponent,
    CoursesComponent,
    GalleryComponent,
    AllCoursesComponent,
    TestimonialComponent,
    FeaturedCoursesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatSnackBarModule,
    MatIconModule
  ],
  providers: [
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp({"projectId":"angular-8b684","appId":"1:626243325982:web:7d60d49e48c5e1e37ade0f","storageBucket":"angular-8b684.appspot.com","apiKey":"AIzaSyARBikKtuWHi6gNKfYzci5VPQI7nBn_D50","authDomain":"angular-8b684.firebaseapp.com","messagingSenderId":"626243325982"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideMessaging(() => getMessaging()),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

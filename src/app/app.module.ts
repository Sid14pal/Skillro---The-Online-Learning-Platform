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
import { DashboardSidebarComponent } from './dashboard/dashboard-sidebar/dashboard-sidebar.component';
import { EditStudentComponent } from './dashboard/edit-student/edit-student.component';
import { DashboardHeaderComponent } from './dashboard/dashboard-header/dashboard-header.component';
import { AboutStudentComponent } from './dashboard/about-student/about-student.component';
import { AddCoursesComponent } from './dashboard/add-courses/add-courses.component';
import { BannerComponent } from './template/banner/banner.component';
import { HomeComponent } from './template/home/home.component';
import { AllCoursesComponent } from './dashboard/all-courses/all-courses.component';
import { CourseDetailsComponent } from './template/course-details/course-details.component';
import { TextSlideComponent } from './template/text-slide/text-slide.component';
import { CategoriesComponent } from './template/categories/categories.component';
import { AboutComponent } from './template/about/about.component';
import { HelpCardComponent } from './template/help-card/help-card.component';
import { PopularCoursesComponent } from './template/popular-courses/popular-courses.component';
import { CounterComponent } from './template/counter/counter.component';
import { NewsletterComponent } from './template/newsletter/newsletter.component';
import { FooterComponent } from './template/footer/footer.component';
import { CourseListComponent } from './template/course-list/course-list.component';
import { StudentChooseAreaComponent } from './template/student-choose-area/student-choose-area.component';
import { AboutUsComponent } from './template/about-us/about-us.component';
import { CoursesComponent } from './template/courses/courses.component';
import { BlogComponent } from './template/blog/blog.component';
import { ContactUsComponent } from './template/contact-us/contact-us.component';
import { StudentDashboardComponent } from './dashboard/student-dashboard/student-dashboard.component';
import { StudentDashboardBannerComponent } from './dashboard/student-dashboard-banner/student-dashboard-banner.component';
import { StudentDashboardSidebarComponent } from './dashboard/student-dashboard-sidebar/student-dashboard-sidebar.component';
import { EnrolledCoursesComponent } from './dashboard/enrolled-courses/enrolled-courses.component';
import { StudentOrderHistoryComponent } from './dashboard/student-order-history/student-order-history.component';
import { StudentLoginComponent } from './dashboard/student-login/student-login.component';
import { StudentDashboardHeaderComponent } from './dashboard/student-dashboard-header/student-dashboard-header.component';
import { CardsComponent } from './template/cards/cards.component';
import { LatestBlogComponent } from './template/latest-blog/latest-blog.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    ForgotPasswordComponent,
    VarifyEmailComponent,
    DashboardComponent,
    DashboardSidebarComponent,
    EditStudentComponent,
    DashboardHeaderComponent,
    AboutStudentComponent,
    AddCoursesComponent,
    BannerComponent,
    HomeComponent,
    AllCoursesComponent,
    CourseDetailsComponent,
    TextSlideComponent,
    CategoriesComponent,
    AboutComponent,
    HelpCardComponent,
    PopularCoursesComponent,
    CounterComponent,
    NewsletterComponent,
    FooterComponent,
    CourseListComponent,
    StudentChooseAreaComponent,
    AboutUsComponent,
    CoursesComponent,
    BlogComponent,
    ContactUsComponent,
    StudentDashboardComponent,
    StudentDashboardBannerComponent,
    StudentDashboardSidebarComponent,
    EnrolledCoursesComponent,
    StudentOrderHistoryComponent,
    StudentLoginComponent,
    StudentDashboardHeaderComponent,
    CardsComponent,
    LatestBlogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatSnackBarModule,
    MatIconModule,
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

import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouteStatusService } from '../../services/route-status.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrl: './student-login.component.css'
})
export class StudentLoginComponent {

  
    constructor (private router: Router, private snackBar: MatSnackBar, private routeStatusService: RouteStatusService, private auth: AngularFireAuth) {
        this.routeStatusService.hideHeader = false;
      }
    
      user : string = '';
      password:string = '';
    
    
    
     studentLogin() {
  if (this.user === '') {
    this.openSnackBar('Please Enter Your Email');
    return;
  }

  if (this.password === '') {
    this.openSnackBar('Please Enter Your Password');
    return;
  }

  this.auth.signInWithEmailAndPassword(this.user, this.password)
    .then((userCredential) => {
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('userDetails', this.user);
      this.router.navigate(['/student-dashboard']);
      console.log(this.user, this.password)
    })
    .catch((error) => {
      this.openSnackBar('Invalid email or password');
      console.error(error);
    });
}
    
        openSnackBar(message: string, action: string = 'Close', duration: number = 3000) {
        this.snackBar.open(message, action, {
          duration: duration,
          verticalPosition: 'top',
          horizontalPosition: 'center', 
          panelClass: ['danger'] 
        });
      }

}

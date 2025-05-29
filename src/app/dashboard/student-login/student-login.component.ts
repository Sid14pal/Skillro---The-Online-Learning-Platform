import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouteStatusService } from '../../services/route-status.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrl: './student-login.component.css'
})
export class StudentLoginComponent {

  
    constructor (private router: Router, private snackBar: MatSnackBar, private routeStatusService: RouteStatusService) {
        this.routeStatusService.hideHeader = false;
      }
    
      user : string = '';
      password:string = '';
    
    
    
      studentLogin() {
    
        if(this.user == '') {
          this.openSnackBar('Please Enter Your Email');
          return;
        }
    
        if(this.password == '') {
          this.openSnackBar('Please Enter Your Password');
          return;
        }
       
        if(this.user == 'thomas@gmail.com' && this.password == '1234') {
          this.router.navigate(['/student-dashboard']);
          sessionStorage.setItem('isLoggedIn', 'true');
          sessionStorage.setItem('userDetails', this.user);
        } else {
           this.openSnackBar('Invalid Input');
        }
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

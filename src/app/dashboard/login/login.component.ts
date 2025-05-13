import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouteStatusService } from '../../services/route-status.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {


  email : string = '';
  password : string = '';
  phoneSignIn = false;
  phoneNumber: string = '';
  otp: string = '';
  verificationId: string = '';
  

  constructor(
    private auth : AuthService,
    private snackBar: MatSnackBar,
    private routeStatusService: RouteStatusService
  ) {
    this.routeStatusService.hideHeader = true;
  }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string = 'Close', duration: number = 3000) {
    this.snackBar.open(message, action, {
      duration: duration,
      verticalPosition: 'top',
      horizontalPosition: 'center', 
      panelClass: ['danger'] 
    });
  }

  login() {

    if(this.email == '') {
      this.openSnackBar('Please Enter Your Email');
      return;
    }

    if(this.password == '') {
      this.openSnackBar('Please Enter Your Password');
      return;
    }

    this.auth.login(this.email,this.password);
    
    this.email = '';
    this.password = '';

  }

  signInWithGoogle() {
    this.auth.googleSignIn();
  }

  togglePhoneSinIn(){
    this.phoneSignIn = !this.phoneSignIn;
  }

  sendOTP() {
    try {
      const formattedNumber = '+91' + this.phoneNumber.replace(/[^\d]/g, '');
      
      this.auth.sendPhoneNumberOTP(formattedNumber)
        .then((verificationId: string) => {
          this.verificationId = verificationId;
          this.openSnackBar('OTP Sent to ' + formattedNumber);
        })
        .catch((error) => {
          this.openSnackBar('Failed to send OTP: ' + error.message);
        });
    } catch (error) {
      this.openSnackBar('Invalid phone number format');
    }
  }

  verifyOTP() {
    this.auth.verifyPhoneNumberOTP(this.verificationId, this.otp)
      .then(() => {
        this.openSnackBar('OTP Verified Successfully');
      })
      .catch((error) => {
        this.openSnackBar('Failed to verify OTP: ' + error.message);
      });
  }

}

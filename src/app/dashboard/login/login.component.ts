import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string = 'Close', duration: number = 3000) {
    this.snackBar.open(message, action, {
      duration: duration,
      verticalPosition: 'top', // 'top' | 'bottom'
      horizontalPosition: 'center', // 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ['danger'] // CSS class to apply to the snackbar container
      // other options as needed
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
      const formattedNumber = '+91' + this.phoneNumber.replace(/[^\d]/g, ''); // Manually format phone number
      
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
        // Proceed with login or other actions upon successful verification
      })
      .catch((error) => {
        this.openSnackBar('Failed to verify OTP: ' + error.message);
      });
  }



}

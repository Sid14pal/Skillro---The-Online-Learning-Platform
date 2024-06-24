import { Injectable } from '@angular/core';
import { GoogleAuthProvider  } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth, private router: Router) { }

   // register method
   register(email : string, password : string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
      alert('Registration Successful');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

    // login method
    login(email : string, password : string) {
      this.fireauth.signInWithEmailAndPassword(email,password).then( () => {
        localStorage.setItem('token', 'true');
          this.router.navigate(['/test-dash'])
      }, err => {
          alert(err.message);
          this.router.navigate(['/login']);
      })
    }

    //sign in with google
    googleSignIn() {
      return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {
  
        this.router.navigate(['/test-dash']);
        localStorage.setItem('token',JSON.stringify(res.user?.uid));
  
      }, err => {
        alert(err.message);
      })
    }

      // forgot password
  forgotPassword(email : string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/varify-email']);
    }, err => {
      alert('Something went wrong');
    })
}

    sendPhoneNumberOTP(phoneNumber: string): Promise<any> {
      const captchaVerifier = new firebase.auth.RecaptchaVerifier('captcha');
      return firebase.auth().signInWithPhoneNumber(phoneNumber, captchaVerifier);
    }
  
    verifyPhoneNumberOTP(verificationId: string, otp: string): Promise<any> {
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, otp);
      return this.fireauth.signInWithCredential(credential);
    }

     
  
}

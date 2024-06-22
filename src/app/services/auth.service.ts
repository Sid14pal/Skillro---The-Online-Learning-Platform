import { Injectable } from '@angular/core';
import { FacebookAuthProvider, GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

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

    //sign in with google
    googleSignIn() {
      return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {
  
        this.router.navigate(['/login']);
        localStorage.setItem('token',JSON.stringify(res.user?.uid));
  
      }, err => {
        alert(err.message);
      })
    }

  
}

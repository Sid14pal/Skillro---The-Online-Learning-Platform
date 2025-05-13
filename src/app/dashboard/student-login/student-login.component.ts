import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrl: './student-login.component.css'
})
export class StudentLoginComponent {

  constructor (private router: Router) {}

  user : string = '';
  password:string = ''



  studentLogin() {
    if(this.user == 'minakshi@gmail.com' && this.password == '1234') {
      this.router.navigate(['/student-dashboard'])
    } else {
      
    }
  }

}

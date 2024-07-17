import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
email: string = '';
password: string = '';
name: string = '';

  constructor(private auth : AuthService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
  }

  
  openSnackBar(message: string, action: string = 'Close', duration: number = 56000) {
    this.snackBar.open(message, action, {
      duration: duration,
      verticalPosition: 'top', // 'top' | 'bottom'
      horizontalPosition: 'center', // 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ['danger'] // CSS class to apply to the snackbar container
      // other options as needed
    });
  }

  register() {

    if(this.name == '') {
      this.openSnackBar('Please Enter Your Name');
      return;
    }

    if(this.email == '') {
      this.openSnackBar('Please Enter Your Email');
      return;
    }

    if(this.password == '') {
      this.openSnackBar('Please Enter Your Password');
      return;
    }

    this.auth.register(this.email,this.password);
    
    this.name = '';
    this.email = '';
    this.password = '';

  }

}

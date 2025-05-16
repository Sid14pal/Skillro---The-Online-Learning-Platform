import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.css'
})
export class NewsletterComponent {

  subscribeMail: string = '';

    constructor (private router: Router, private snackBar: MatSnackBar,) {}

    resetValue() {
      this.subscribeMail = '';
    }


  subscribe() {
    if(this.subscribeMail == '') {
      this.openSnackBar('Please Enter a valid mail id');
    } else if (this.subscribeMail == this.subscribeMail) {
      this.openSnackBar('Your Mail has been submitted');
      this.resetValue();
      return;
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

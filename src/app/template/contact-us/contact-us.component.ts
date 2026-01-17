import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {

  constructor(private snackbar: MatSnackBar, private firestore: AngularFirestore) {}

  contactData: any = {
    name: '',
    email: '',
    subject: '',
    descriptions: '',
    checkbox: ''
  }

  resetContactForm() {
    this.contactData = {
    name: '',
    email: '',
    subject: '',
    descriptions: '',
    checkbox: ''
  }
}



  submitContactForm() {
      if(this.contactData.name === '' || this.contactData.email === '' || this.contactData.subject === '' || this.contactData.descriptions === '' || this.contactData.checkbox === '') {
      this.snackbar.open('Please fill all the fields', 'Close', { duration: 4000, panelClass: ['danger', 'vertical-center-snackba'],});
    } else {
      const contactUserdata = {
      contactInfo: this.contactData,
    }
      this.firestore.collection('contactDetails').add(contactUserdata)
      .then(() => {
        this.snackbar.open('Your message has been sent successfully!', 'Close', { duration: 4000, panelClass: ['danger', 'vertical-center-snackba'],});
        this.resetContactForm();
        console.log(contactUserdata)
      })
    }

}



}

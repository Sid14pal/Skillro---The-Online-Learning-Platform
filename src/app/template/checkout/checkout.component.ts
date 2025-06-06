import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { checkout } from '../../datatype';
import { CountryService } from '../../services/country.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  cartItems: any[] = [];
  countries: string[] = [];
  states: string[] = [];
  today: string = '';

  selectedCountry: string = '';

  checkoutData: checkout = {
    firstName: '',
    lastName: '',
    companyName: '',
    country: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    paymentCard: '',
    cardNumber: '',
    month: '',
    year: '',
    cvv: '',
    date: '',
  }

  resetForm() {
    this.checkoutData = {
    firstName: '',
    lastName: '',
    companyName: '',
    country: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    paymentCard: '',
    cardNumber: '',
    month: '',
    year: '',
    cvv: '',
    date: '',
    };
  }

  constructor(private firestore: AngularFirestore, private snackBar: MatSnackBar, private countryService: CountryService, private router: Router) { }

  ngOnInit(): void {
    this.firestore.collection('cart').snapshotChanges().subscribe(snapshot => {
      this.cartItems = snapshot.map(doc => {
        const data = doc.payload.doc.data() as { [key: string]: any };
        const id = doc.payload.doc.id;
        return { id, ...data };
      });
    });

    this.countryService.getCountries().subscribe((res: any) => {
    this.countries = res.data.map((item: any) => item.name).sort();
    });

    const now = new Date();
    this.today = now.toISOString().substring(10 , 0)
    this.checkoutData.date = this.today;
  }

    onCountryChange(country: string): void {
    this.selectedCountry = country;
    this.countryService.getStates(country).subscribe((res: any) => {
      this.states = res.data.states.map((s: any) => s.name).sort();
    });
  }

  trackById(index: number, item: any): string {
    return item.id;
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price);
      return sum + (isNaN(price) ? 0 : price);
    }, 0);
  }

  submitCheckout() {
    const checkoutUserDetails = {
      orderInfo: this.checkoutData,
      cartInfo: this.cartItems,
    }

    if(!this.validateForm()) {
      return;
    } 

    this.firestore.collection('checkout').add(checkoutUserDetails)
      .then(() => {
        this.router.navigate(['/thankyou'], { queryParams: { email: this.checkoutData.email } });
        this.openSnackBar('Your order has been submitted successfully');
        this.resetForm();
        console.log(checkoutUserDetails)
      })
  }

  openSnackBar(message: string, action: string = 'Close', duration: number = 56000) {
    this.snackBar.open(message, action, {
      duration: duration,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['success']
    });
  }

  validateForm(): boolean {
    if (!this.checkoutData.firstName) {
      this.snackBar.open('Please enter your First name', 'Close', { duration: 4000, panelClass: ['danger', 'vertical-center-snackba'],});
      return false;
    }
    if (!this.checkoutData.lastName) {
      this.snackBar.open('Please enter your Last name', 'Close', { duration: 4000, panelClass: ['danger', 'vertical-center-snackba'],});
      return false;
    }
    if (!this.checkoutData.country) {
      this.snackBar.open('Please enter your country name', 'Close', { duration: 4000, panelClass: ['danger', 'vertical-center-snackba'],});
      return false;
    }
    if (!this.checkoutData.address) {
      this.snackBar.open('Please enter your address', 'Close', { duration: 4000, panelClass: ['danger', 'vertical-center-snackba'],});
      return false;
    }
    if (!this.checkoutData.city) {
      this.snackBar.open('Please enter your ciry name', 'Close', { duration: 4000, panelClass: ['danger', 'vertical-center-snackba'],});
      return false;
    }
    if (!this.checkoutData.state) {
      this.snackBar.open('Please enter your state name', 'Close', { duration: 4000, panelClass: ['danger', 'vertical-center-snackba'],});
      return false;
    }
    if (!this.checkoutData.zip) {
      this.snackBar.open('Please enter your zip', 'Close', { duration: 4000, panelClass: ['danger', 'vertical-center-snackba'],});
      return false;
    }
    if (!this.checkoutData.phone) {
      this.snackBar.open('Please enter your phone number', 'Close', { duration: 4000, panelClass: ['danger', 'vertical-center-snackba'],});
      return false;
    }
    if (!this.checkoutData.paymentCard) {
      this.snackBar.open('Please enter your payment method', 'Close', { duration: 4000, panelClass: ['danger', 'vertical-center-snackba'],});
      return false;
    }
    if (!this.checkoutData.cardNumber) {
      this.snackBar.open('Please enter your Card Number', 'Close', { duration: 4000, panelClass: ['danger', 'vertical-center-snackba'],});
      return false;
    }
    if (!this.checkoutData.month) {
      this.snackBar.open('Please enter credit card month', 'Close', { duration: 4000, panelClass: ['danger', 'vertical-center-snackba'],});
      return false;
    }
    if (!this.checkoutData.year) {
      this.snackBar.open('Please enter credit card year', 'Close', { duration: 4000, panelClass: ['danger', 'vertical-center-snackba'],});
      return false;
    }
    if (!this.checkoutData.cvv) {
      this.snackBar.open('Please enter credit card cvv', 'Close', { duration: 4000, panelClass: ['danger', 'vertical-center-snackba'],});
      return false;
    }
    return true;
  }

}

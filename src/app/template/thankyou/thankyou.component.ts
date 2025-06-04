import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrl: './thankyou.component.css'
})
export class ThankyouComponent {

  cartItems: any[] = [];
  orderId: any = '';

  signupPassword: string = '';
showPassword: boolean = false;

  constructor(private firestore: AngularFirestore, private snackBar: MatSnackBar) {}

    ngOnInit(): void {
    this.firestore.collection('cart').snapshotChanges().subscribe(snapshot => {
      this.cartItems = snapshot.map(doc => {
        const data = doc.payload.doc.data() as { [key: string]: any };
        this.orderId = Math.floor((Math.random() * 1000000) + 1);
        return { ...data };
      });
    });
  }

  getTotalPrice(): number {
  return this.cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price); 
    return sum + (isNaN(price) ? 0 : price);
  }, 0);
}
}

import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

    cartItems: any[] = [];

  constructor(private firestore: AngularFirestore, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.firestore.collection('cart').snapshotChanges().subscribe(snapshot => {
      this.cartItems = snapshot.map(doc => {
        const data = doc.payload.doc.data() as { [key: string]: any };
        const id = doc.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  removeFromCart(itemId: string) {
    this.openSnackBar('tem Deleted Successfully');
    this.firestore.collection('cart').doc(itemId).delete()
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

addToCart(item: any) {
  const itemId = item.id;

  this.firestore.collection('cart', ref => ref.where('id', '==', itemId)).get().subscribe(snapshot => {
    if (snapshot.empty) {
      this.firestore.collection('cart').add(item).then(() => {
        this.openSnackBar('Item added to cart');
      });
    } else {
      this.openSnackBar('Item is already in cart', 'Close', 3000);
    }
  });
}


  openSnackBar(message: string, action: string = 'Close', duration: number = 56000) {
    this.snackBar.open(message, action, {
      duration: duration,
      verticalPosition: 'top', // 'top' | 'bottom'
      horizontalPosition: 'center', // 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ['success'] // CSS class to apply to the snackbar container
      // other options as needed
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{

  orderDetails : any[] = [];

  constructor(private firestore: AngularFirestore) {}


  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.firestore.collection('checkout').snapshotChanges().subscribe(snapshot => {
      this.orderDetails = snapshot.map(doc => {
        const data = doc.payload.doc.data() as { [key: string]: any };
        const id = doc.payload.doc.id;

        const orderInfo = data['orderInfo'] || {};
        const cartinfo = data['cartInfo'] || []; 

        return { id, orderInfo, cartinfo };
      });

      
    }, error => {
      console.error('Error fetching orders:', error);
    });
  }

}

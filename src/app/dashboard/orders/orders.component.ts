import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{

  orderDetails : any[] = [];
  selectedOrder: any;
  email: any = 'siddharthapaul440@gmail.com';

  constructor(private firestore: AngularFirestore, config: NgbModalConfig, private modalService: NgbModal,) {}


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

open(content: TemplateRef<any>, item: any) {
  this.selectedOrder = item;
  this.modalService.open(content, { size: 'xl', windowClass: 'custom-modal-xl' });
}


}

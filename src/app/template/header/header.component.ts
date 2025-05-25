import { Component } from '@angular/core';
import { RouteStatusService } from '../../services/route-status.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

    cartItemCount: number = 0;

  constructor(public routeStatusService: RouteStatusService, private firestore: AngularFirestore){
    this.routeStatusService.hideHeader = true;
  }

    ngOnInit(): void {
    this.firestore.collection('cart').snapshotChanges().subscribe(snapshot => {
      this.cartItemCount = snapshot.length;
    });
  }

  public isCollapsed = true;

}

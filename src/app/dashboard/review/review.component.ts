import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit{

  reviews: any[] = [];

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getReviews();
  }

    getReviews() {
this.firestore.collection('review', ref => ref.orderBy('timestamp', 'desc'))
  .valueChanges()
  .subscribe(data => {
    this.reviews = data.map((item: any) => {
      return {
        ...item,
        timestamp: item.timestamp?.toDate()
      };
    });
  });
  }

}

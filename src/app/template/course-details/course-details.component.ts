import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { review } from '../../datatype';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css',
})
export class CourseDetailsComponent implements OnInit {

  active = 1;
  reviewData = {
    name: '',
    review: '',
    rating: ''
  };

  reviews: any[] = [];


  course_image: string = '';
  course_name: string = '';
  course_price: string = '';
  course_lesson: string = '';
  course_category: string = '';
  data: string = '';
  course_contents: any = [];
  course_video: string = '';

  constructor(private router: ActivatedRoute, private firestore: AngularFirestore, private snackBar: MatSnackBar, private bootstrap: NgbAccordionModule, private route: Router) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.course_image = params['image'];
      this.course_name = params['name'];
      this.course_price = params['price'];
      this.course_lesson = params['lesson'];
      this.course_category = params['category'];
      this.course_video = params['video'];

      const contents = params['contents'];
      if (contents) {
        try {
          this.course_contents = JSON.parse(contents);
        } catch (e) {
          console.error('Failed to parse course contents:', e);
        }
      }
    });
    this.getReviews();
  }

  addToCart() {
    const cartItem = {
      image: this.course_image,
      name: this.course_name,
      price: this.course_price,
      lesson: this.course_lesson,
      category: this.course_category,
      video: this.course_video,
      addedAt: new Date()
    };

    this.firestore.collection('cart', ref => ref.where('name', '==', cartItem.name)).get().subscribe(snapshot => {
      if (snapshot.empty) {
        this.firestore.collection('cart').add(cartItem)
          .then(() => {
            this.openSnackBar('Item added successfully');
          })
          .catch(error => {
            console.error('Error adding to cart: ', error);
          });
      } else {
        this.snackBar.open('Product is already added in cart', 'Close', { duration: 4000, panelClass: ['danger',], verticalPosition: 'top', });
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

  submitReview() {
    if (!this.reviewData.name || !this.reviewData.review || !this.reviewData.rating) {
      alert('Please fill in all fields');
      return;
    }

    const review = {
      ...this.reviewData,
      timestamp: new Date()  // optional: helps for ordering
    };

    this.firestore.collection('review').add(review)
      .then(() => {
        this.reviewData = {name: '', review: '', rating: ''};
        this.getReviews();  // Refresh reviews
      });
  }

  getReviews() {
    this.firestore.collection('review', ref => ref.orderBy('timestamp', 'desc'))
      .valueChanges()
      .subscribe(data => {
        this.reviews = data;
      });
  }
}

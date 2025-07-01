import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import videojs from 'video.js';
import type Player from 'video.js/dist/types/player';
import { review } from '../../datatype';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css',
})
export class CourseDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

  player!: Player;
  active = 1;
  showReview: any[] = [];

  course_image: string = '';
  course_name: string = '';
  course_price: string = '';
  course_lesson: string = '';
  course_category: string = '';
  data: string = '';
  course_contents: any = [];
  course_video: string = '';

  reviewData: review = {
    name: '',
    review: '',
    rating: '',
  }

  constructor(private router: ActivatedRoute, private firestore: AngularFirestore, private snackBar: MatSnackBar, private bootstrap: NgbAccordionModule) { }

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
  }


  ngAfterViewInit(): void {
    this.player = videojs('my-video');
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
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

  resetForm() {
    this.reviewData = {
      name: '',
      review: '',
      rating: '',
    };
  }

  submitReview() {
    const review = {
      reviewInfo: this.reviewData,
    }

        if(!this.validateForm()) {
      return;
    } 

    this.firestore.collection('review').add(review)
      .then(() => {
        this.openSnackBar('You have successfully submitted the review');
        this.resetForm();
        console.log(review)
      })
  }

  validateForm(): boolean {
    if (!this.reviewData.name) {
      this.snackBar.open('Please enter your name', 'Close', { duration: 4000, panelClass: ['danger', 'vertical-center-snackba'],});
      return false;
    }
        if (!this.reviewData.review) {
      this.snackBar.open('Please enter your review', 'Close', { duration: 4000, panelClass: ['danger', 'vertical-center-snackba'],});
      return false;
    }
        if (!this.reviewData.rating) {
      this.snackBar.open('Please enter the rating', 'Close', { duration: 4000, panelClass: ['danger', 'vertical-center-snackba'],});
      return false;
    }
    return true;
  }
}

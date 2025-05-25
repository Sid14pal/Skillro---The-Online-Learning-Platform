import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {

  course_image: string = '';
  course_name: string = '';
  course_price: string = '';
  course_lesson: string = '';
  course_category: string = '';
  data: string = '';

  constructor(private router: ActivatedRoute, private firestore: AngularFirestore,  private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.course_image = params['image'];
      this.course_name = params['name'];
      this.course_price = params['price'];
      this.course_lesson = params['lesson'];
      this.course_category = params['category'];
    });
  }

  active = 1;

  addToCart() {
    const cartItem = {
      image: this.course_image,
      name: this.course_name,
      price: this.course_price,
      lesson: this.course_lesson,
      category: this.course_category,
      addedAt: new Date()
    };

    this.firestore.collection('cart').add(cartItem)
      .then(() => {
        this.openSnackBar('item Added Successfully');
      })
      .catch(error => {
        console.error('Error adding to cart: ', error);
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

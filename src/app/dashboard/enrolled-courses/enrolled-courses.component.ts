import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enrolled-courses',
  templateUrl: './enrolled-courses.component.html',
  styleUrl: './enrolled-courses.component.css'
})
export class EnrolledCoursesComponent implements OnInit {

  cart: any[] = [];
student: any;

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore, private router: Router ) {}
  

    ngOnInit(): void {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.firestore.collection('userCarts').doc(user.uid).get().subscribe(doc => {
          const data = doc.data();
          this.cart = (data as any)?.cart || [];
        });
      }
    });
  }

          playVideo(student: any) {
          this.router.navigate(['/play-video'], 
          {
            queryParams: {
              video: student.videoUrl
            }
          });
        }

}

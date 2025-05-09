import { Component, OnInit } from '@angular/core';
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

  constructor(private router: ActivatedRoute) {}

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

}

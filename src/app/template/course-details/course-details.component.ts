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
  course_description: string = '';

  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.course_image = params['image'];
      this.course_description = params['description'];
      this.course_name = params['name'];
    });
  }

}

import { Component, NgZone, OnInit  } from '@angular/core';

declare function productScroll(): void; // Declare the external function

@Component({
  selector: 'app-course-slider',
  templateUrl: './course-slider.component.html',
  styleUrls: ['./course-slider.component.css']
})
export class CourseSliderComponent implements OnInit {
  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    productScroll(); // Call the external function
  }
}

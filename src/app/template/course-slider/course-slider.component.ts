import { Component, NgZone, OnInit  } from '@angular/core';
import { RouteStatusService } from '../../services/route-status.service';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Student } from '../../datatype';

declare function productScroll(): void; // Declare the external function

@Component({
  selector: 'app-course-slider',
  templateUrl: './course-slider.component.html',
  styleUrls: ['./course-slider.component.css']
})
export class CourseSliderComponent implements OnInit {

      studentsList: Student[] = [];
        studentObj: Student = {
          id: '',
          name: '',
          email: '',
          roll: '',
          class: '',
          mobile: '',
          bloodgroup: '',
          address: '',
          gender: '',
          birthDay: '',
        };
  
        user: any = {};
        userInitials: string | undefined;
  constructor(private ngZone: NgZone,  private data: StudentService, private router: Router, private auth:AuthService,) {
  }

  ngOnInit(): void {
    productScroll(); // Call the external function
    this.getAllStudents();
  }

  getAllStudents() {
    this.data.getAllStudents().subscribe(res => {
      this.studentsList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      });
    }, err => {
      alert('Error while fetching student data');
    });
  }

  
}

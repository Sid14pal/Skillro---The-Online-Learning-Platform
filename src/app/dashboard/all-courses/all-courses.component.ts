import { Component } from '@angular/core';
import { RouteStatusService } from '../../services/route-status.service';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { courses } from '../../datatype';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.css'
})
export class AllCoursesComponent {

   courseList: courses[] = [];
    courseObj: courses = {
    id: '',
    course : '',
    code : '',
    description : '',
    department: '',
    duration: '',
    };
  
    user: any = {};
    userInitials: string | undefined;

  constructor(private routeStatusService: RouteStatusService, private data: StudentService, private router: Router, private auth:AuthService) {
    this.routeStatusService.hideHeader = true;
  }

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses() {
    this.data.getAllStudents().subscribe(res => {
      this.courseList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      });
    }, err => {
      alert('Error while fetching student data');
    });
  }

}

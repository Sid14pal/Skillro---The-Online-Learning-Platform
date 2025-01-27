import { Component } from '@angular/core';
import { RouteStatusService } from '../../services/route-status.service';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Student } from '../../datatype';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {

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

  constructor(private routeStatusService: RouteStatusService, private data: StudentService, private router: Router, private auth:AuthService,){
      this.routeStatusService.hideHeader = true;
    }

    ngOnInit(): void {
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

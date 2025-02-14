import { Component, NgZone } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Student } from '../../datatype';

@Component({
  selector: 'app-featured-courses',
  templateUrl: './featured-courses.component.html',
  styleUrl: './featured-courses.component.css'
})
export class FeaturedCoursesComponent {

  backgroundImage = '../assets/templates/banner.png';

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

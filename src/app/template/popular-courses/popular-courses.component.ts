import { Component, NgZone } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Student } from '../../datatype';

@Component({
  selector: 'app-popular-courses',
  templateUrl: './popular-courses.component.html',
  styleUrl: './popular-courses.component.css'
})
export class PopularCoursesComponent {

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
  
      viewDetails(student: any) {
        this.router.navigate(['/course-details'], 
        {
          queryParams: {
            image: student.imageUrl,
            name: student.name,
            price: student.class,
            lesson: student.roll,
            category: student.email
          }
        });
      }

}

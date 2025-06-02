import { Component } from '@angular/core';
import { RouteStatusService } from '../../services/route-status.service';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { courses, Student } from '../../datatype';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.css'
})
export class AllCoursesComponent {

   studentsList: Student[] = [];
    studentObj: Student = {
      id: '',
      name: '',
      category: '',
      duration: '',
      price: '',
    };

  selectedImage?: File;
  isLoading = false;
  
    user: any = {};
    userInitials: string | undefined;
  
    constructor(private routeStatusService: RouteStatusService, private data: StudentService, private router: Router, private auth:AuthService, private snackBar: MatSnackBar){
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
  
    deleteStudent(student: Student) {
      if (window.confirm('Are you sure you want to delete ' + student.name + ' ?')) {
        this.data.deleteStudent(student);
      }
    }

}
import { Component } from '@angular/core';
import { RouteStatusService } from '../../services/route-status.service';
import { Student } from '../../datatype';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrl: './all-students.component.css'
})
export class AllStudentsComponent {
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

  constructor(private routeStatusService: RouteStatusService, private data: StudentService, private router: Router){
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
      })

    }, err => {
      alert('Error while fetching student data');
    })

  }

  deleteStudent(student: Student) {
    if (window.confirm('Are you sure you want to delete ' + student.name + ' ?')) {
      this.data.deleteStudent(student);
    }
  }

  editStudent(studentId: string): void {
    this.router.navigate(['/edit-student', studentId]);
  }

}

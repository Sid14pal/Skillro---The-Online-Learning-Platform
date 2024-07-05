import { Component } from '@angular/core';
import { RouteStatusService } from '../../services/route-status.service';
import { StudentService } from '../../services/student.service';
import { Student } from '../../datatype';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrl: './add-students.component.css'
})
export class AddStudentsComponent {

  studentsList: Student[] = [];
  studentObj: Student = {
    id: '',
    name: '',
    email: '',
    
  };

  id: string = '';
  name: string = '';
  email: string = '';

  constructor(private routeStatusService: RouteStatusService, private data: StudentService){
    this.routeStatusService.hideHeader = true;
  }



  resetForm() {
    this.id = '';
    this.name = '';
    this.email = '';
  }

  addStudent() {

    this.studentObj.id = '';
    this.studentObj.name = this.name;
    this.studentObj.email = this.email;

    this.data.addStudent(this.studentObj);
    this.resetForm();

  }



}

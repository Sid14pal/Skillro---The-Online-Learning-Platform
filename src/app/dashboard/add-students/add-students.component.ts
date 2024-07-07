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
    roll: '',
    class: '',
    mobile: '',
    bloodgroup: '',
    address: '',
    gender: '',
    birthDay: '',
    
  };

  id: string = '';
  name: string = '';
  email: string = '';
  roll: string = '';
  class: string = '';
  mobile: string = '';
  bloodgroup: string = '';
  address: string = '';
  gender: string = '';
  birthDay: string = '';

  constructor(private routeStatusService: RouteStatusService, private data: StudentService){
    this.routeStatusService.hideHeader = true;
  }



  resetForm() {
    this.id = '';
    this.name = '';
    this.email = '';
    this.roll = '';
    this.class = '';
    this.mobile = '';
    this.bloodgroup = '';
    this.gender = '';
    this.address = '';
    this.birthDay = '';
  }

  addStudent() {

    this.studentObj.id = '';
    this.studentObj.name = this.name;
    this.studentObj.email = this.email;
    this.studentObj.roll = this.roll;
    this.studentObj.class = this.class;
    this.studentObj.mobile = this.mobile;
    this.studentObj.bloodgroup = this.bloodgroup;
    this.studentObj.gender = this.gender;
    this.studentObj.gender = this.gender;
    this.studentObj.birthDay = this.birthDay;

    this.data.addStudent(this.studentObj);
    this.resetForm();

  }



}

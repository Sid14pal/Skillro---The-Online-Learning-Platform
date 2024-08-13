import { Component } from '@angular/core';
import { RouteStatusService } from '../../services/route-status.service';
import { Student } from '../../datatype';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  user: any = {};
  userInitials: string | undefined;

  constructor(private routeStatusService: RouteStatusService, private data: StudentService, private router: Router, private auth:AuthService,){
    this.routeStatusService.hideHeader = true;
  }

  ngOnInit(): void {
    this.getAllStudents();
    this.auth.getCurrentUser().subscribe(user => {
      if (user) {
        this.user = user;
        this.userInitials = this.getInitials(user);
        console.log('User data:', this.user);
      }
    });
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

  editStudent(studentId: string): void {
    this.router.navigate(['/edit-student', studentId]);
  }

  getInitials(user: any): string {
    if (user.displayName) {
      const names = user.displayName.split(' ');
      const initials = names.map((name: string) => name.charAt(0)).join('');
      return initials.toUpperCase();
    } else if (user.email) {
      const emailParts = user.email.split('@')[0].split('.');
      const initials = emailParts.map((part: string) => part.charAt(0)).join('');
      return initials.toUpperCase();
    }
    return '';
  }

  signOut(){
    this.auth.logout();
  }

}

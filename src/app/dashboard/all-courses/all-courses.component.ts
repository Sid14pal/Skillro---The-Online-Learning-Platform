import { Component } from '@angular/core';
import { RouteStatusService } from '../../services/route-status.service';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { courses, Student } from '../../datatype';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
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
      email: '',
      roll: '',
      class: '',
      mobile: '',
      bloodgroup: '',
      address: '',
      gender: '',
      birthDay: '',
    };

  selectedImage?: File;
  isLoading = false;
  
    user: any = {};
    userInitials: string | undefined;
  
    constructor(private routeStatusService: RouteStatusService, private data: StudentService, private router: Router, private auth:AuthService, config: NgbModalConfig,
		private modalService: NgbModal, private snackBar: MatSnackBar){
      this.routeStatusService.hideHeader = true;
      config.backdrop = 'static';
		  config.keyboard = false;
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
      this.router.navigate(['update-courses', studentId]);
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

  open(content: any) {
		this.modalService.open(content);
	}

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  resetForm() {
    this.studentObj = {
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
      imageUrl: ''
    };
  }

  async addStudent() {
    if (!this.validateForm()) {
      return;
    }
    
    this.isLoading = true;
    if (this.selectedImage) {
      const path = `images/${Date.now()}_${this.selectedImage.name}`;
      try {
        this.studentObj.imageUrl = await this.data.uploadImage(this.selectedImage, path);
        this.saveStudentData();
        this.isLoading = false;
        this.snackBar.open('Student Added Successfully', 'Close', { duration: 4000, panelClass: ['success', 'vertical-center-snackba'],});
      } catch (error) {
        console.error("Error uploading image: ", error);
        this.isLoading = false;
      }
    } else {
      this.saveStudentData();
      this.isLoading = false;
    }
  }

  saveStudentData() {
    this.data.addStudent(this.studentObj).then(() => {
      this.resetForm();
    });
  }

  validateForm(): boolean {
    if (!this.studentObj.name) {
      this.snackBar.open('Please Enter the course name', 'Close', { duration: 4000, panelClass: ['danger'],});
      return false;
    }
    if (!this.studentObj.email) {
      this.snackBar.open('Please Enter the Category', 'Close', { duration: 4000, panelClass: ['danger'],});
      return false;
    }
    if (!this.studentObj.roll) {
      this.snackBar.open('Please Enter the Duration', 'Close', { duration: 4000, panelClass: ['danger'],});
      return false;
    }
    if (!this.studentObj.class) {
      this.snackBar.open('Please Enter the Price', 'Close', { duration: 4000, panelClass: ['danger'],});
      return false;
    }
    return true;
  }

}
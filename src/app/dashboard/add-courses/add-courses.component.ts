import { Component } from '@angular/core';
import { RouteStatusService } from '../../services/route-status.service';
import { StudentService } from '../../services/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { courses } from '../../datatype';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrl: './add-courses.component.css'
})
export class AddCoursesComponent {

  studentsList: courses[] = [];
  studentObj: courses = {
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

  selectedImage?: File;
  isLoading = false;

  constructor(private routeStatusService: RouteStatusService, private data: StudentService, private snackBar: MatSnackBar) {
    this.routeStatusService.hideHeader = true;
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
      this.snackBar.open('Please Enter the name', 'Close', { duration: 4000, panelClass: ['danger', 'vertical-center-snackba'],});
      return false;
    }
    if (!this.studentObj.email) {
      this.snackBar.open('Please Enter the email', 'Close', { duration: 4000, panelClass: ['danger', 'vertical-center-snackba'],});
      return false;
    }
    if (!this.studentObj.roll) {
      this.snackBar.open('Please Enter the Roll No', 'Close', { duration: 4000, panelClass: ['danger', 'vertical-center-snackba'],});
      return false;
    }
    if (!this.studentObj.class) {
      this.snackBar.open('Please Enter the class', 'Close', { duration: 4000, panelClass: ['danger', 'vertical-center-snackba'],});
      return false;
    }
    if (!this.studentObj.mobile) {
      this.snackBar.open('Please Enter the mobile', 'Close', { duration: 4000, panelClass: ['danger', 'vertical-center-snackba'],});
      return false;
    }
    if (!this.studentObj.bloodgroup) {
      this.snackBar.open('Please Enter the blood group', 'Close', { duration: 4000, panelClass: ['danger', 'vertical-center-snackba'],});
      return false;
    }
    if (!this.studentObj.address) {
      this.snackBar.open('Please Enter the address', 'Close', { duration: 4000, panelClass: ['danger', 'vertical-center-snackba'],});
      return false;
    }
    if (!this.studentObj.gender) {
      this.snackBar.open('Please Enter the gender', 'Close', { duration: 4000, panelClass: ['danger', 'vertical-center-snackba'],});
      return false;
    }
    if (!this.studentObj.birthDay) {
      this.snackBar.open('Please Enter the birthday', 'Close', { duration: 4000, panelClass: ['danger', 'vertical-center-snackba'],});
      return false;
    }
    return true;
  }

}

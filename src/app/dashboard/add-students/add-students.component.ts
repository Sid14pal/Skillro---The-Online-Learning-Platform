import { Component } from '@angular/core';
import { RouteStatusService } from '../../services/route-status.service';
import { StudentService } from '../../services/student.service';
import { Student } from '../../datatype';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css']
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
    imageUrl: ''
  };

  selectedImage?: File;
  isLoading = false;
  successMessage = '';

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
    this.successMessage = '';
  }

  async addStudent() {
    this.isLoading = true;
    if (this.selectedImage) {
      const path = `images/${Date.now()}_${this.selectedImage.name}`;
      try {
        this.studentObj.imageUrl = await this.data.uploadImage(this.selectedImage, path);
        this.saveStudentData();
        this.isLoading = false;
        this.openSnackBar('Student added successfully!', 'Close',)
        
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

  openSnackBar(message: string, action: string = 'Close', duration: number = 5000) {
    this.snackBar.open(message, action, {
      duration: duration,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['success'] 
    });
  }
}

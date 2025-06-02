import { Component } from '@angular/core';
import { RouteStatusService } from '../../services/route-status.service';
import { StudentService } from '../../services/student.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Student } from '../../datatype';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrl: './add-courses.component.css'
})
export class AddCoursesComponent {

  
  currentStep = 0;
  tabs = ['Course Details', 'Course Content', 'Publish Course'];
  imagePreview: string | ArrayBuffer | null = null;
  loading = false;

  studentsList: Student[] = [];
    studentObj: Student = {
      id: '',
      name: '',
      category: '',
      duration: '',
      price: '',
    };

  selectedImage: File | null = null;
  imagePreviewUrl: string | null = null;
  
    user: any = {};
    userInitials: string | undefined;
      courseContents = [
    { name: '', description: '' }
  ];

  addContent() {
    this.courseContents.push({ name: '', description: '' });
  }

  removeContent(index: number) {
    this.courseContents.splice(index, 1);
  }
  
    constructor(private routeStatusService: RouteStatusService, private data: StudentService, private router: Router, private auth:AuthService, private snackBar: MatSnackBar){
      this.routeStatusService.hideHeader = true;
    }

    next() {
    if (this.currentStep < this.tabs.length - 1) this.currentStep++;
  }

  back() {
    if (this.currentStep > 0) this.currentStep--;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedImage = file;
      this.imagePreviewUrl = URL.createObjectURL(file);
    }
  }

  removeImage(): void {
    this.selectedImage = null;
    this.imagePreviewUrl = null;
  }

  async addStudent() {
  if (!this.validateForm()) {
    return;
  }

  this.loading = true; // show loader

  try {
    if (this.selectedImage) {
      const path = `images/${Date.now()}_${this.selectedImage.name}`;
      this.studentObj.imageUrl = await this.data.uploadImage(this.selectedImage, path);
    }
    await this.saveStudentData();
    this.snackBar.open('Course Added Successfully', 'Close', { duration: 4000, panelClass: ['success', 'vertical-center-snackba'] });
  } catch (error) {
    console.error("Error uploading image: ", error);
    this.snackBar.open('Error occurred. Please try again.', 'Close', { duration: 4000, panelClass: ['danger'] });
  } finally {
    this.loading = false; // hide loader
  }
}

  saveStudentData() {
    this.data.addStudent(this.studentObj).then(() => {
    });
  }

  validateForm(): boolean {
    if (!this.studentObj.name) {
      this.snackBar.open('Please Enter the course name', 'Close', { duration: 4000, panelClass: ['danger'],});
      return false;
    }
    if (!this.studentObj.category) {
      this.snackBar.open('Please Enter the Category', 'Close', { duration: 4000, panelClass: ['danger'],});
      return false;
    }
    if (!this.studentObj.duration) {
      this.snackBar.open('Please Enter the Duration', 'Close', { duration: 4000, panelClass: ['danger'],});
      return false;
    }
    if (!this.studentObj.price) {
      this.snackBar.open('Please Enter the Price', 'Close', { duration: 4000, panelClass: ['danger'],});
      return false;
    }
    return true;
  }

}

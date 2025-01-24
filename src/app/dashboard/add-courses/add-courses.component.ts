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

  coursesList: courses[] = [];
  courseObj: courses = {
    id: '',
    course: '',
    code: '',
    description: '',
    department: '',
    duration: '',
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
    this.courseObj = {
      id: '',
      course: '',
      code: '',
      description: '',
      department: '',
      duration: '',
      imageUrl: ''
    };
  }

  async addCourse() {
    if (!this.validateForm()) {
      return;
    }
    
    this.isLoading = true;
    if (this.selectedImage) {
      const path = `images/${Date.now()}_${this.selectedImage.name}`;
      try {
        this.courseObj.imageUrl = await this.data.uploadImage(this.selectedImage, path);
        this.isLoading = false;
        this.snackBar.open('Student Added Successfully', 'Close', { duration: 4000, panelClass: ['success', 'vertical-center-snackba'],});
      } catch (error) {
        console.error("Error uploading image: ", error);
        this.isLoading = false;
      }
    } else {
      this.isLoading = false;
    }
  }

  saveCourseData() {
    this.data.addCourse(this.courseObj).then(() => {
      this.resetForm();
    });
  }
 

  validateForm(): boolean {
    if (!this.courseObj.course) {
      this.snackBar.open('Please Enter the course', 'Close', { duration: 4000, panelClass: ['danger', 'vertical-center-snackba'],});
      return false;
    }
    if (!this.courseObj.code) {
      this.snackBar.open('Please Enter the code', 'Close', { duration: 4000, panelClass: ['danger', 'vertical-center-snackba'],});
      return false;
    }
    if (!this.courseObj.description) {
      this.snackBar.open('Please Enter the description', 'Close', { duration: 4000, panelClass: ['danger', 'vertical-center-snackba'],});
      return false;
    }
    if (!this.courseObj.department) {
      this.snackBar.open('Please Enter the department', 'Close', { duration: 4000, panelClass: ['danger', 'vertical-center-snackba'],});
      return false;
    }
    if (!this.courseObj.duration) {
      this.snackBar.open('Please Enter the duration', 'Close', { duration: 4000, panelClass: ['danger', 'vertical-center-snackba'],});
      return false;
    }
    return true;
  }

}

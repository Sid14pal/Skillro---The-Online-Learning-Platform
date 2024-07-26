import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentService } from '../../services/student.service';
import { Student } from '../../datatype';
import { RouteStatusService } from '../../services/route-status.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  studentId: string = '';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private data: StudentService,
    private snackBar: MatSnackBar,
    private routeStatusService: RouteStatusService,
  ) {
    this.routeStatusService.hideHeader = true;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.studentId = params['id'];
      this.loadStudentData();
    });
  }

  loadStudentData(): void {
    this.data.getStudentById(this.studentId).subscribe((student: Student | undefined) => {
      if (student) {
        this.studentObj = student;
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  async updateStudent() {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    if (this.selectedImage) {
      const path = `images/${Date.now()}_${this.selectedImage.name}`;
      try {
        this.studentObj.imageUrl = await this.data.uploadImage(this.selectedImage, path);
        this.saveStudentData();
      } catch (error) {
        console.error("Error uploading image: ", error);
        this.isLoading = false;
      }
    } else {
      this.saveStudentData();
    }
  }

  saveStudentData() {
    this.data.updateStudent(this.studentId, this.studentObj).then(() => {
      this.isLoading = false;
      this.snackBar.open('Student Updated Successfully', 'Close', { duration: 4000, panelClass: ['success', 'vertical-center-snackbar'] });
      this.router.navigate(['/all-student']);
    });
  }

  validateForm(): boolean {
    if (!this.studentObj.name) {
      this.snackBar.open('Please Enter the name', 'Close', { duration: 4000, panelClass: ['danger', 'vertical-center-snackbar'] });
      return false;
    }
    return true;
  }
}

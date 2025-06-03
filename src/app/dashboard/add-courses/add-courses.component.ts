import { Component } from '@angular/core';
import { RouteStatusService } from '../../services/route-status.service';
import { StudentService } from '../../services/student.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Student } from '../../datatype';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';

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
  selectedVideo: File | null = null;
  videoPreviewUrl: string | null = null;
  uploadProgress: number | null = null;
  videoDownloadUrl: string | undefined;
  videoUploading = false;
  videoUploaded = false;

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

  courseContents = [
    { name: '', description: '' }
  ];

  addContent() {
    this.courseContents.push({ name: '', description: '' });
  }

  removeContent(index: number) {
    this.courseContents.splice(index, 1);
  }

  constructor(private routeStatusService: RouteStatusService, private data: StudentService, private router: Router, private auth: AuthService, private snackBar: MatSnackBar) {
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

  onVideoSelected(event: any): void {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      this.selectedVideo = file;
      this.videoPreviewUrl = URL.createObjectURL(file);
      this.videoUploaded = false;
    }
  }

  removeVideo(): void {
    this.selectedVideo = null;
    this.videoPreviewUrl = null;
    this.uploadProgress = null;
    this.videoUploaded = false;
  }

  uploadVideo(): void {
    if (!this.selectedVideo) return;

    const videoPath = `videos/${Date.now()}_${this.selectedVideo.name}`;
    this.videoUploading = true;

    const uploadTask = this.data.uploadVideo(this.selectedVideo, videoPath);

    uploadTask.percentageChanges().subscribe(progress => {
      this.uploadProgress = progress ?? 0;
    });

    uploadTask.snapshotChanges().pipe(
      finalize(async () => {
        this.videoDownloadUrl = await this.data.getDownloadUrl(videoPath).toPromise();
        this.videoUploading = false;
        this.videoUploaded = true;
      })
    ).subscribe();
  }

  async addStudent() {
    if (!this.validateForm()) return;

    this.loading = true;

    try {
      if (this.selectedImage) {
        const imagePath = `images/${Date.now()}_${this.selectedImage.name}`;
        this.studentObj.imageUrl = await this.data.uploadImage(this.selectedImage, imagePath);
      }

      if (this.videoDownloadUrl) {
        this.studentObj.videoUrl = this.videoDownloadUrl;
      }

      this.studentObj.courseContents = this.courseContents;
      await this.saveStudentData();

      this.snackBar.open('Course Published Successfully', 'Close', {
        duration: 4000,
        panelClass: ['success']
      });

    } catch (err) {
      console.error(err);
      this.snackBar.open('Error publishing course', 'Close', {
        duration: 4000,
        panelClass: ['danger']
      });
    } finally {
      this.loading = false;
    }
  }

  saveStudentData() {
    this.data.addStudent(this.studentObj).then(() => {
    });
  }

  validateForm(): boolean {
    if (!this.studentObj.name) {
      this.snackBar.open('Please Enter the course name', 'Close', { duration: 4000, panelClass: ['danger'], });
      return false;
    }
    if (!this.studentObj.category) {
      this.snackBar.open('Please Enter the Category', 'Close', { duration: 4000, panelClass: ['danger'], });
      return false;
    }
    if (!this.studentObj.duration) {
      this.snackBar.open('Please Enter the Duration', 'Close', { duration: 4000, panelClass: ['danger'], });
      return false;
    }
    if (!this.studentObj.price) {
      this.snackBar.open('Please Enter the Price', 'Close', { duration: 4000, panelClass: ['danger'], });
      return false;
    }
    return true;
  }

}

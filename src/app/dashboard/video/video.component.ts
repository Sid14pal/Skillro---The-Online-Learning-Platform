import { Component } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent {
  selectedFile: File | null = null;
  uploadProgress: number | null = null;
  downloadURL: string | null = null;

  constructor(private student: StudentService) {}

  onFileSelected(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  upload(): void {
    if (!this.selectedFile) {
      console.warn('No file selected');
      return;
    }

    const filePath = `videos/${Date.now()}_${this.selectedFile.name}`;
    const uploadTask = this.student.uploadVideo(this.selectedFile, filePath);

    uploadTask.percentageChanges().subscribe(progress => {
      this.uploadProgress = progress ?? 0;
    });

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        this.student.getDownloadUrl(filePath).subscribe(
          url => {
            this.downloadURL = url;
            console.log('Download URL:', url);
          },
          error => {
            console.error('Error getting download URL:', error);
          }
        );
      })
    ).subscribe();
  }
}

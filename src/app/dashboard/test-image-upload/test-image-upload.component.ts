import { Component } from '@angular/core';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-test-image-upload',
  templateUrl: './test-image-upload.component.html',
  styleUrl: './test-image-upload.component.css'
})
export class TestImageUploadComponent {

  selectedImage?: File;
  imageUrl?: string;

  constructor(private data: StudentService){}

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  async upload() {
    if (this.selectedImage) {
      const path = `images/${Date.now()}_${this.selectedImage.name}`;
      try {
        this.imageUrl = await this.data.uploadImage(this.selectedImage, path);
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    } else {
      console.error("No image selected.");
    }
  }

}

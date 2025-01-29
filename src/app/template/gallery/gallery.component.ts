import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {

  lightboxVisible = false;
  lightboxImage: string = '';

  openLightbox(imageSrc: string): void {
    this.lightboxImage = imageSrc;
    this.lightboxVisible = true;
  }

  closeLightbox(): void {
    this.lightboxVisible = false;
  }

}

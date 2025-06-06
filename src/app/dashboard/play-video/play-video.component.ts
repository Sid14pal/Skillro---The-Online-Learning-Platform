import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-play-video',
  templateUrl: './play-video.component.html',
  styleUrl: './play-video.component.css'
})
export class PlayVideoComponent {

  videoUrl: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.videoUrl = params['video'];
      console.log(this.videoUrl)
    });
  }


}

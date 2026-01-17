import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-play-video',
  templateUrl: './play-video.component.html',
  styleUrls: ['./play-video.component.css'] // ✅ fixed typo: should be styleUrls
})
export class PlayVideoComponent implements OnInit {

  videoUrl: string | null = null;
  isBrowser = false;

  constructor(private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.videoUrl = params['video'];
    });
  }
}

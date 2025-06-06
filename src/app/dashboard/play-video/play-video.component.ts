import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import videojs from 'video.js';
import type Player from 'video.js/dist/types/player';

@Component({
  selector: 'app-play-video',
  templateUrl: './play-video.component.html',
  styleUrl: './play-video.component.css'
})
export class PlayVideoComponent implements AfterViewInit, OnDestroy {

    player!: Player;
    videoUrl = '';
  video = '';

     constructor(private route: ActivatedRoute) {}


     ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.video = params['video'];
    });
  }


    ngAfterViewInit(): void {
      this.player = videojs('my-video');
    }
    
    ngOnDestroy(): void {
      if (this.player) {
        this.player.dispose();
      }
    }

}

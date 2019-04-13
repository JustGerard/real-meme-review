import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoService } from './video.service';
import { Video } from './video';
import { timer } from 'rxjs';
import { delay } from 'q';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  link;
  base_link = "https://www.youtube.com/embed/";
  constructor(private domSanitizer: DomSanitizer, private videoService: VideoService) { }
  videos = [];
  sub = null;
  currently_playing = 0;

  ngOnInit() {
    this.showVideos();
    // var video1: Video = new Video("CEzSXX3tcmU", 21, 1, 1000);
    // var video2: Video = new Video("2FianKdFM44", 37, 1, 1000);
    // this.videos.push(video1);
    // this.videos.push(video2);
    
    this.playNextVideo();
  }
  
  public playNextVideo(){
    if(this.currently_playing == this.videos.length){
      this.currently_playing = 0;
    }
    var video = this.videos[this.currently_playing];
    this.playVideo(video);
    this.currently_playing++;
  }

  private playVideo(video: Video){
      console.log("Playing video ", video.url);
      this.link = this.domSanitizer.bypassSecurityTrustResourceUrl(this.toYoutubeEmbedUrl(video.url));
  }
  private toYoutubeEmbedUrl(id: string): string {
    return this.base_link + id;
  }

  public showVideos() {
    this.videoService.getVideos()
      .subscribe(videos => this.videos = videos);

  }
}

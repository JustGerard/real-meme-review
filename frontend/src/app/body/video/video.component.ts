import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoService } from './video.service';
import { IVideo } from './video';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  link;
  base_link = "https://www.youtube.com/embed/";
  constructor(private domSanitizer: DomSanitizer, private videoService: VideoService) { }
  videos: IVideo[];
  sub = null;
  currently_playing = 0;
  loaded: boolean = false;
  display_video = false;
  async ngOnInit() {
    await this.getVideos();
    console.log("Waiting")
  }

  private getVideos() {
    this.videoService.getVideos()
    .subscribe(data => {
      console.log(data);
      this.loaded = true;
      this.videos = data.results;
      console.log(this.videos)
    });
  }

  public playNextVideo() {
    if(this.display_video == false){
      this.display_video = true;
    }
    if (this.currently_playing == this.videos.length) {
      this.currently_playing = 0;
    }
    var video = this.videos[this.currently_playing];
    this.playVideo(video);
    this.currently_playing++;
  }

  private playVideo(video: IVideo) {
    console.log("Playing video ", video.url);
    this.link = this.domSanitizer.bypassSecurityTrustResourceUrl(this.toYoutubeEmbedUrl(video.url));
  }
  private toYoutubeEmbedUrl(id: string): string {
    return this.base_link + id;
  }
}


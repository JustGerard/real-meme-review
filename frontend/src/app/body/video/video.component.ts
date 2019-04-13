import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoService } from './video.service';
import { Video } from './video';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  link;
  base_link = "https://www.youtube.com/embed/";
  constructor(private domSanitizer: DomSanitizer, private videoService: VideoService) { }
  videos = []
  ngOnInit() {
    this.link = this.domSanitizer.bypassSecurityTrustResourceUrl(this.toYoutubeEmbedUrl("CEzSXX3tcmU"));
    var video1: Video = new Video("CEzSXX3tcmU", 2137, 1, 1000);
    var video2: Video = new Video("url2", 2137, 1, 1000);
    this.videos.push(video1);
    this.videos.push(video2);
  }

  private toYoutubeEmbedUrl(id: string): string {
    return this.base_link + id;
  }

  public showVideos() {
    this.videoService.getVideos()
      .subscribe(videos => this.videos = videos);

  }
}

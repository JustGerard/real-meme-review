import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  link;
  base_link = "https://www.youtube.com/embed/";
  constructor(private domSanitizer : DomSanitizer) { }

  ngOnInit() {
    this.link = this.domSanitizer.bypassSecurityTrustResourceUrl(this.toYoutubeEmbedUrl("CEzSXX3tcmU"));
  }

  private toYoutubeEmbedUrl(id: string): string{
    return this.base_link + id;
  }

}

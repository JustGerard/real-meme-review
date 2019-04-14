import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoService } from './video.service';
import { IVideo } from './video';
import { Observer, Subject, timer, Observable } from 'rxjs';
import { WebcamInitError, WebcamImage, WebcamUtil } from 'ngx-webcam';

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


  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints;
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  private frames: string[];

  async ngOnInit() {
    await this.getVideos();
    this.frames = [];
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });

    this.sub = timer(1000, 1000);
    this.sub.subscribe(tick => this.triggerSnapshot());
  }

  private getVideos() {
    this.videoService.getVideos()
      .subscribe(data => {
        this.loaded = true;
        this.videos = data.results;
      });
  }

  public playNextVideo() {
    if (this.display_video == false) {
      this.display_video = true;
      this.frames = [];
    }
    if (this.currently_playing == this.videos.length) {
      this.currently_playing = 0;
    }
    var video = this.videos[this.currently_playing];
    if (this.frames.length != 0) {
      this.videoService.sendImages(video, this.frames).subscribe(elem => console.log("LOG:", elem));
      this.frames = [];
    }
    this.playVideo(video);
    this.currently_playing++;
  }

  private playVideo(video: IVideo) {
    this.link = this.domSanitizer.bypassSecurityTrustResourceUrl(this.toYoutubeEmbedUrl(video.url));
  }
  private toYoutubeEmbedUrl(id: string): string {
    return this.base_link + id;
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }
  public handleImage(webcamImage: WebcamImage): void {

    this.webcamImage = webcamImage;
    // console.log(webcamImage.imageAsDataUrl);
    this.frames.push(webcamImage.imageAsDataUrl);
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public startWatching() {
    this.display_video = true;
    this.playNextVideo();
  }
}


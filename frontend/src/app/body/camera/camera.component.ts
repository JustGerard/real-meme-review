import { Component, OnInit } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable, timer } from 'rxjs';
import { CameraService } from './camera.service';
import { IVideo } from '../video/video';
import { _appIdRandomProviderFactory } from '@angular/core/src/application_tokens';
@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

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
  private sub = null;
  private frames: string[];

  constructor(private cameraService: CameraService){}

  public ngOnInit(): void {
    this.frames = [];
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });

    // this.sub = timer(1000, 1000);
    // this.sub.subscribe(tick => this.triggerSnapshot());
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this.frames.push(webcamImage.imageAsBase64);
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }


}

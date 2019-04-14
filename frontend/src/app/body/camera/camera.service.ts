import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IVideo } from '../video/video';
import { Observable } from 'rxjs';
import { IPostRequestBody } from '../video/postrequestbody';
@Injectable({
  providedIn: 'root'
})
export class CameraService {
  body_url = "http://127.0.0.1/";
  put_url_base = this.body_url + "/api/insert/";
  put_url_end = "/update_video/";
  constructor(private http: HttpClient) { }

}

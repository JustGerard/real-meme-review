import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IVideo } from './video';
import { Observable } from 'rxjs/internal/Observable';
import { GetResponse } from './getresponse';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  base_url = "http://127.0.0.1:8000";
  videosUrl = this.base_url + "/api/insert/";
  _url: string = "assets/videos.json";
  constructor(private http: HttpClient) { }

 public getVideos(): Observable<GetResponse>{
   return this.http.get<GetResponse>(this.videosUrl);
 }
}



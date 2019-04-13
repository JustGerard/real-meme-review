import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Video } from './video';
@Injectable({
  providedIn: 'root'
})
export class VideoService {
  base_url = "127.0.0.1:8000";
  getVideosUrl = this.base_url + "/api/insert";
  constructor(private http: HttpClient) { }

  public getVideos() {
    return this.http.get<Video[]>(this.getVideosUrl);
  }

  
}

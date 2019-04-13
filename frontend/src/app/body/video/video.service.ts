import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Video } from './video';
@Injectable({
  providedIn: 'root'
})
export class VideoService {

  getVideosUrl: string;
  constructor(private http: HttpClient) { }

  public getVideos() {
    return this.http.get<Video[]>(this.getVideosUrl);
  }

  
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IVideo } from './video';
import { Observable } from 'rxjs/internal/Observable';
import { GetResponse } from './getresponse';
import { PostRequestBody } from './postrequestbody';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  //base_url = "https://real-meme-review-backend.herokuapp.com";
  base_url = "http://127.0.0.1:8000"
  videosUrl = this.base_url + "/api/insert/";
  put_url_end = "/update_video/";
  _url: string = "assets/videos.json";
  constructor(private http: HttpClient) { }

  public getVideos(): Observable<GetResponse> {
    return this.http.get<GetResponse>(this.videosUrl);
  }

  public sendImages(video: IVideo, frames: string[]): Observable<PostRequestBody> {
    var post_request_body: PostRequestBody = new PostRequestBody(video.length, video.url, frames);
    let url = this.videosUrl + video.url + this.put_url_end;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
   });
   let options = {
      headers: headers
   }
    return this.http.post<PostRequestBody>(url, post_request_body, options);
  }
}

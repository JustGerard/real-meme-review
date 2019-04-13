export class Video {
    url: string;
    length: number;
    quality: number;
    views: number;

    constructor(url: string, length: number, quality: number, views: number){
        this.url = url;
        this.length = length;
        this.quality = quality;
        this.views = views;
    }
}

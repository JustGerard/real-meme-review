export class PostRequestBody {
    length: number;
    frames: string[];
    url: string;
    constructor(length:number, url: string, frames: string[]){
        this.length = length;
        this.frames = frames;
        this.url = url;
    }
}
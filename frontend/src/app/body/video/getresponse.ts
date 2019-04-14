import { IVideo } from './video';

export interface GetResponse {
    count: number;
    results: IVideo[];
    next: any;
    prev: any;
}

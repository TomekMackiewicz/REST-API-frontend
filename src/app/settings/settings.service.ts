import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SettingsService {

    constructor(private http: Http) {}

//    getSettings(id: number) {
//        return this.http.get
//            ('http://localhost:8000/settings/' + id)
//            .map((res: Response) => res.json());
//    }
//
//    updateSettings(settings:any) {
//        let headers = new Headers({ 'Content-Type': 'application/json' });
//        let options = new RequestOptions({ headers: headers });
//        let body = settings;
//
//        return this.http.put
//            ('http://localhost:8000/settings/1', body, options)
//        //.map((res: Response) => res.json());
//    }

}

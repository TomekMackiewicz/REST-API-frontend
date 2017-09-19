import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from "@angular/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TextService {

    constructor(private http: Http) {}

    getTextByID(id: number) {
        return this.http.get
            ('http://localhost:8000/texts/preview/' + id)
            .map((res: Response) => res.json());
    }

    getTextByToken(token: number) {
        return this.http.get
            ('http://localhost:8000/texts/full/' + token)
            .map((res: Response) => res.json());
    }

    processTransaction(body: Object) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });

        return this.http.post
            ('http://localhost:8000/payments', body, options)
            .map((res: Response) => res.json());            
    }

}


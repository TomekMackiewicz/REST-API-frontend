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
    
//    getTexts() {
//        return this.http.get
//            ('http://localhost:8000/texts')
//            .map((res: Response) => res.json());        
//    }

    processTransaction(body: Object) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        //headers.append('Authorization', 'Bearer d9a4536e-62ba-4f60-8017-6053211d3f47');
        let options = new RequestOptions({ headers: headers });

//        return this.http.post
//            ('https://secure.snd.payu.com/api/v2_1/orders', body, options)
//            .map((res: Response) => res.json());
        return this.http.post
            ('http://localhost:8000/payments', body, options)
            .map((res: Response) => res.json());            
    }

}


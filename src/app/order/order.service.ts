import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from "@angular/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class OrderService {

    constructor(private http: Http) {}
    
    getOrders() {
        return this.http.get
            ('http://localhost:8000/payments')
            .map((res: Response) => res.json());        
    }

}

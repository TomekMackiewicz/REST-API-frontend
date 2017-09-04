import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class OrderService {

    constructor(private http: Http) {}

    getOrder(id: number) {
        return this.http.get
            ('http://localhost:8000/orders/' + id)
            .map((res: Response) => res.json());
    }

    getOrders() {
        return this.http.get
            ('http://localhost:8000/orders')
            .map((res: Response) => res.json());
    }

    createOrder(order) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        let body = order;
        return this.http.post
            ('http://localhost:8000/orders', body, options);
    }

//    updateCategory(category) {
//        let headers = new Headers({'Content-Type': 'application/json'});
//        let options = new RequestOptions({headers: headers});
//        let body = category;
//
//        return this.http.put
//            ('http://localhost:8000/categories/' + category.id, body, options)
//        //.map((res: Response) => res.json());
//    }
//
//    deleteCategory(category) {
//        return this.http.delete
//            ('http://localhost:8000/categories/' + category.id);
//    }

}


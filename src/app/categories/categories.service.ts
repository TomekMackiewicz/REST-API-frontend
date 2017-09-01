import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CategoriesService {

    constructor(private http: Http) {}

    getCategory(id: number) {
        return this.http.get
            ('http://localhost:8000/categories/' + id)
            .map((res: Response) => res.json());
    }

    getCategories() {
        return this.http.get
            ('http://localhost:8000/categories')
            .map((res: Response) => res.json());
    }

    createCategory(category) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let body = category;
        return this.http.post
            ('http://localhost:8000/categories', body, options);
        //.map((res:Response) => res.json());
    }

    updateCategory(category) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let body = category;

        return this.http.put
            ('http://localhost:8000/categories/' + category.id, body, options)
        //.map((res: Response) => res.json());
    }

    deleteCategory(category) {
        return this.http.delete
            ('http://localhost:8000/categories/' + category.id);
    }

}

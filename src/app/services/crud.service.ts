import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from 'rxjs/Rx';

@Injectable()
export class CrudService {

    constructor(private http: Http) {}

    getDocuments() {
        return this.http.get
            ('http://localhost:8000/documents')
            .map((res: Response) => res.json());
    }

    getCategories() {
        return this.http.get
            ('http://localhost:8000/categories')
            .map((res: Response) => res.json());
    }

}

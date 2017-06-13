import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from 'rxjs/Rx';

@Injectable()
export class DocumentService {

    constructor(private http: Http) {}

    getDocument(id: number) {
        return this.http.get
            ('http://localhost:8000/documents/' + id)
            .map((res: Response) => res.json());
    }

    getDocuments() {
        return this.http.get
            ('http://localhost:8000/documents')
            .map((res: Response) => res.json());
    }

    createDocument(document: any) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        //let body = JSON.stringify(document);
        let body = document;
        //console.log(body);
        return this.http.post
            ('http://localhost:8000/documents', body, headers);
        //.map((res:Response) => res.json());
    }

    updateDocument(document: any) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let body = document;

        return this.http.put
            ('http://localhost:8000/documents/' + document.id, body, headers)
        //.map((res: Response) => res.json());
    }

    deleteDocument(document: any) {
        return this.http.delete
            ('http://localhost:8000/documents/' + document.id);
    }

    getCategories() {
        return this.http.get
            ('http://localhost:8000/categories')
            .map((res: Response) => res.json());
    }

}
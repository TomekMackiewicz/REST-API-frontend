import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from "@angular/http";
import { Observable } from 'rxjs/Rx';

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
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: headers});
        let body = document;
        return this.http.post
            ('http://localhost:8000/documents', body, options);
        //.map((res:Response) => res.json());
    }

    downloadFile(id: number): Observable<Blob> {
        let options = new RequestOptions({responseType: ResponseContentType.Blob });
        return this.http.get('http://localhost:8000/documents/' + id, options)
            .map(res => res.blob())
            //.catch(this.handleError)
    }

    updateDocument(document: any) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = document;

        return this.http.put
            ('http://localhost:8000/documents/' + document.id, body, options)
        //.map((res: Response) => res.json());
    }

    deleteDocument(document: any) {
        return this.http.delete
            ('http://localhost:8000/documents/' + document.id);
    }

}
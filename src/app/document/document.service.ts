import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, ResponseContentType} from "@angular/http";
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

    downloadFile(id: number): Observable<Blob> {
        let options = new RequestOptions({responseType: ResponseContentType.Blob });
        return this.http.get('http://localhost:8000/documents/' + id, options)
            .map(res => res.blob())
            //.catch(this.handleError)
    }

    processTransaction(body) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        //headers.append('Authorization', 'Bearer d9a4536e-62ba-4f60-8017-6053211d3f47');
        let options = new RequestOptions({headers: headers});

        return this.http.post
            ('https://secure.snd.payu.com/api/v2_1/orders', body, options)
            .map((res: Response) => res.json());
//        return this.http.post
//            ('http://localhost:8000/payments', body, options)
//            .map((res: Response) => res.json());            
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
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

    getFiles() {
        return this.http.get
            ('http://localhost:8000/files')
            .map((res: Response) => res.json());
    }

    renameFile(oldName: string, newName: string) {
        //console.log(oldName);
        //console.log(newName);        
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let body = newName;

        return this.http.put
            ('http://localhost:8000/files/' + options, body, oldName);
    }

    deleteFile(file: any) {
        return this.http.delete
            ('http://localhost:8000/files/' + file);
    }

    createForm(form: any) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        //let body = JSON.stringify(document);
        let body = form;
        //console.log(body);
        return this.http.post
            ('http://localhost:8000/forms', body, headers);
        //.map((res:Response) => res.json());
    }

}

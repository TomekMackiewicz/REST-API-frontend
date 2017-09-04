import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { NgForm } from '@angular/forms';

@Injectable()
export class FormService {

    constructor(private http: Http) {}

    getForm(id: number) {
        return this.http.get
            ('http://localhost:8000/forms/' + id)
            .map((res: Response) => res.json());
    }

    getForms() {
        return this.http.get
            ('http://localhost:8000/forms')
            .map((res: Response) => res.json());
    }

    createForm(form: any) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let body = form;

        return this.http.post
            ('http://localhost:8000/forms', body, options);
            //.map((res:Response) => res.json())
    }

    getCategories() {
        return this.http.get
            ('http://localhost:8000/categories')
            .map((res: Response) => res.json());
    }

    submitAnswers(answer: any) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let body = answer;
        
        return this.http.post
            ('http://localhost:8000/answers', body, options);        
    }

    updateForm(form: any) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let body = form;

        return this.http.put
            ('http://localhost:8000/forms/' + form.id, body, options)
            .map((res: Response) => res.json());
    }

    deleteForm(form: any) {
        return this.http.delete
            ('http://localhost:8000/forms/' + form.id);
    }

    deleteQuestion(id: number) {
        return this.http.delete
            ('http://localhost:8000/questions/' + id);
    }

    deleteOption(id: number) {
        return this.http.delete
            ('http://localhost:8000/options/' + id);
    }

}

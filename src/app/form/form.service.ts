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

//    getText(id: number) {
//        return this.http.get
//            ('http://localhost:8000/texts/' + id)
//            .map((res: Response) => res.json());
//    }

    getForms() {
        return this.http.get
            ('http://localhost:8000/forms')
            .map((res: Response) => res.json());
    }

    createForm(form: any) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        //let body = JSON.stringify(document);
        let body = form;
        //console.log(body);
        return this.http.post
            ('http://localhost:8000/forms', body, headers);
            //.map((res:Response) => res.json())
    }

    submitAnswers(answer: any) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let body = answer;
        //console.log(body);
        return this.http.post
            ('http://localhost:8000/answers', body, headers);        
    }

    updateForm(form: any) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let body = form;

        return this.http.put
            ('http://localhost:8000/forms/' + form.id, body, headers)
            .map((res: Response) => res.json());
    }
//
    deleteForm(form: any) {
        return this.http.delete
            ('http://localhost:8000/forms/' + form.id);
    }

    deleteQuestion(question: any) {
        return this.http.delete
            ('http://localhost:8000/questions/' + question.id);
    }

    deleteOption(option: any) {
        return this.http.delete
            ('http://localhost:8000/options/' + option.id);
    }

}

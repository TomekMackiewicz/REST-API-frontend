import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

    private subject = new Subject<any>();

    getUsername(): Observable<any> {
        return this.subject.asObservable();
    }

    constructor(private http: Http) {
        var currentUsername = localStorage.getItem('currentUsername');
    }

    login(username: string, password: string) {
        return this.http.post('http://localhost:8000/login', { username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json();
                if (token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('token', JSON.stringify(token));
                    localStorage.setItem('currentUsername', username);
                    this.subject.next(localStorage.getItem('currentUsername'));
                }
            });
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUsername');
        this.subject.next();
    }


}

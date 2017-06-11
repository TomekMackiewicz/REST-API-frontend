import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

    private subject = new Subject<any>();

    getUsername(): Observable<any> {
        return this.subject.asObservable();
    }

    constructor(private http: Http) {}

    login(username: string, password: string) {
        return this.http.post('http://localhost:8000/login', {username: username, password: password})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('currentUsername', username);
                    this.subject.next({text: localStorage.getItem('currentUsername')});
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUsername');
        this.subject.next();
    }


}

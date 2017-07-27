import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TextService {

    constructor(private http: Http) {}

    getText(id: number) {
        return this.http.get
            ('http://localhost:8000/texts/' + id)
            .map((res: Response) => res.json());
    }

}


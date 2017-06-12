import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Rx';
import {CrudService} from '../services/crud.service';

@Component({
    selector: 'app-front-document',
    templateUrl: './front-document.component.html',
    //styleUrls: ['./document.component.css'],
})

export class FrontDocumentComponent implements OnInit {

    public document: any;

    constructor(       
        private crudService: CrudService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.crudService.getDocument(+params['document']))
            .subscribe(category => this.document = category);
    }

}


import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Rx';
import {DocumentService} from './document.service';

@Component({
    selector: 'app-front-document',
    templateUrl: './document-front.component.html'
})

export class DocumentFrontComponent implements OnInit {

    public document: any;

    constructor(
        private documentService: DocumentService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.documentService.getDocument(+params['document']))
            .subscribe(category => this.document = category);
    }

}


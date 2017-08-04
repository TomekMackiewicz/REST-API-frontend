import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Rx';
import {DocumentService} from './document.service';
import {AlertService} from '../alert/alert.service';
import {slideInOutAnimation} from '../animations/index';

@Component({
    selector: 'document-edit',
    templateUrl: './document-edit.component.html',
    animations: [slideInOutAnimation],
    host: { '[@slideInOutAnimation]': '' }    
})

export class DocumentEditComponent implements OnInit {

    public document: any;
    public categoriesArray: Array<{id: number, name: string}> = [];

    constructor(
        private documentService: DocumentService,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.documentService.getDocument(+params['id']))
            .subscribe(document => this.document = document);
    }

    updateDocument(id: number, title: string, body: any) {
        let document = {id: id, title: title, body: body, categories: this.categoriesArray};
        this.documentService.updateDocument(document).subscribe(
            data => {
                this.alertService.success('Document updated.');
                return true;
            },
            error => {
                this.alertService.error("Error updating document! " + error);
                return Observable.throw(error);
            }
        );
    }

    goBack(): void {
        this.location.back();
    }

}

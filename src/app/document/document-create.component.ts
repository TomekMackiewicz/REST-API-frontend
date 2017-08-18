import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Observable} from 'rxjs/Rx';
import { DocumentService } from './document.service';
import { FormService } from '../form/form.service';
import { AlertService } from '../alert/alert.service';
import { LoaderService } from '../services/loader.service';
import { slideInOutAnimation } from '../animations/index';

@Component({
    selector: 'document-create',
    templateUrl: './document-create.component.html',
    animations: [slideInOutAnimation],
    host: {'[@slideInOutAnimation]': ''}
})

export class DocumentCreateComponent implements OnInit {
    
    public document: any;
    public form: any;
    public forms: any;

    constructor(
        private documentService: DocumentService,
        private formService: FormService,
        private alertService: AlertService,
        private loaderService: LoaderService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit() {
        this.getForms();
    }

    goBack(): void {
        this.location.back();
    }

    createDocument(title: string, body: string) {
        let document = {title: title, body: body, formId: this.form.id};
        this.loaderService.displayLoader(true); 
        this.documentService.createDocument(document).subscribe(
            data => {
                this.loaderService.displayLoader(false); 
                this.alertService.success('Document created.');
                return true;
            },
            error => {
                this.loaderService.displayLoader(false); 
                this.alertService.error("Error saving document! " + error);
                return Observable.throw(error);
            }
        );
    }

    getForms() {
        this.formService.getForms().subscribe(
            data => {this.forms = data},
            err => console.error(err),
            () => console.log('done loading forms')
        );
    }
    
    showForm(id: number) {
        this.formService.getForm(id).subscribe(
            data => {this.form = data},
            err => console.error(err),
            () => console.log('done loading form')
        );
    }

}

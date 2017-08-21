import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Rx';
import { DocumentService } from './document.service';
import { FormService } from '../form/form.service';
import { AlertService } from '../alert/alert.service';
import { LoaderService } from '../services/loader.service';
import { slideInOutAnimation } from '../animations/index';

@Component({
    selector: 'document-edit',
    templateUrl: './document-edit.component.html',
    animations: [slideInOutAnimation],
    host: { '[@slideInOutAnimation]': '' }    
})

export class DocumentEditComponent implements OnInit {

    public document: any;
    public forms: any;
    public currentForm: any;    

    constructor(
        private documentService: DocumentService,
        private formService: FormService,
        private alertService: AlertService,
        private loaderService: LoaderService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.getForms();
        this.route.params
            .switchMap((params: Params) => this.documentService.getDocument(+params['id']))
            .subscribe(document => {
                this.document = document;
                if(this.document.form) {
                    this.initialForm(this.document.form.id);                    
                }
            });            
    }

    updateDocument(id: number, title: string, body: any) {
        if (this.currentForm) {
            let document = { id: id, title: title, body: body, formId: this.currentForm.id };
            this.loaderService.displayLoader(true);
            this.documentService.updateDocument(document).subscribe(
                data => {
                    this.loaderService.displayLoader(false); 
                    this.alertService.success('Document updated.');
                    return true;
                },
                error => {
                    this.loaderService.displayLoader(false); 
                    this.alertService.error("Error updating document! " + error);
                    return Observable.throw(error);
                }
            );
        } else {
            this.alertService.error("Please choose the form.");
        }
    }

    getForms() {
        this.formService.getForms().subscribe(
            data => { this.forms = data },
            err => console.error(err),
            () => console.log('done loading forms')
        );
    }
    
    initialForm(id: number) {
        let result = this.forms.filter(x => x.id === id);
        this.currentForm = result[0];
    }

    changeForm(id: number) {
        this.formService.getForm(id).subscribe(
            data => { this.currentForm = data },
            err => console.error(err),
            () => console.log('done loading current form')
        );
    }

    goBack(): void {
        this.location.back();
    }

}

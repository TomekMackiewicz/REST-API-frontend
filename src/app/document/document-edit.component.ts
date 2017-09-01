import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
        private location: Location,
        private ref: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.loaderService.displayLoader(true);
        this.getForms();
        this.route.params
            .switchMap((params: Params) => this.documentService.getDocument(+params['id']))
            .subscribe(
                data => {
                    this.loaderService.displayLoader(false);                    
                    this.document = data;
                    if(this.document.form) {
                        this.initialForm(this.document.form.id);                    
                    };
                    this.ref.detectChanges();
                },
                error => {
                    this.loaderService.displayLoader(false);
                    this.alertService.error("Error loading document! " + error);
                    this.ref.detectChanges();
                    return Observable.throw(error);
                }                   
            );            
    }

    updateDocument(id: number, title: string, body: any) {
        if (this.currentForm) {
            this.loaderService.displayLoader(true);            
            let document = { id: id, title: title, body: body, formId: this.currentForm.id };
            this.documentService.updateDocument(document).subscribe(
                data => {
                    this.loaderService.displayLoader(false); 
                    this.alertService.success('Document updated.');
                    this.ref.markForCheck();
                },
                error => {
                    this.loaderService.displayLoader(false); 
                    this.alertService.error("Error updating document! " + error);
                    this.ref.markForCheck();
                    return Observable.throw(error);
                }
            );
        } else {
            this.alertService.error("Please choose the form.");
        }
    }

    getForms() {
        this.formService.getForms().subscribe(
            data => { 
                this.forms = data;
                this.ref.detectChanges(); 
            },
            error => this.alertService.error("Error updating document! " + error)
        );
    }
    
    initialForm(id: number) {
        let result = this.forms.filter(x => x.id === id);
        this.currentForm = result[0];
        this.ref.detectChanges(); 
    }

    changeForm(id: number) {
        this.formService.getForm(id).subscribe(
            data => { 
                this.currentForm = data;
                this.ref.markForCheck(); 
            },
            error => this.alertService.error("Error changing form! " + error)
        );
    }

    goBack(): void {
        this.location.back();
    }

}

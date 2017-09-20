import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Observable} from 'rxjs/Rx';
import { DocumentService } from './document.service';
import { FormService } from '../form/form.service';
import { AlertService } from '../alert/alert.service';
import { LoaderService } from '../services/loader.service';
import { Document } from './model/document';
import { Form } from '../form/models/form';
import { ComponentCanDeactivate } from '../guards/pending-changes.guard';
//import { slideInOutAnimation } from '../animations/index';

@Component({
    selector: 'document-create',
    templateUrl: './document-create.component.html',
    //animations: [slideInOutAnimation],
    //host: {'[@slideInOutAnimation]': ''}
})

export class DocumentCreateComponent implements OnInit, ComponentCanDeactivate {
    
    private document: Document;
    private properties: any;
    private form: Form;
    private forms: Array<Form>;
    private change: boolean = false;

    constructor(
        private documentService: DocumentService,
        private formService: FormService,
        private alertService: AlertService,
        private loaderService: LoaderService,
        private route: ActivatedRoute,
        private location: Location,
        private ref: ChangeDetectorRef
    ) {}

    // @HostListener allows us to also guard against browser refresh, close, etc.
    @HostListener('window:beforeunload')
    canDeactivate(): Observable<boolean> | boolean {
        if(this.change !== false) {
            return false; 
        } else {
            return true;
        } 
    }

    ngOnInit() {
        this.properties = {
            id: null,
            title: '',
            body: '',
            form: {
                id: null
            }
        }
        this.document = new Document(this.properties);
        this.getForms();
    }

    goBack(): void {
        this.location.back();
    }

    trackChanges(change: boolean) {
        this.change = change;
    }

    createDocument() {
        if (this.form) {
            this.loaderService.displayLoader(true); 
            this.documentService.createDocument(this.document).subscribe(
                data => {
                    this.loaderService.displayLoader(false); 
                    this.trackChanges(false);
                    this.alertService.success('Document created.');
                    this.ref.markForCheck();
                },
                error => {
                    this.loaderService.displayLoader(false); 
                    this.alertService.error("Error saving document! " + error);
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
            error => {
                this.alertService.error("Error loading forms! " + error);
            }
        );
    }
    
    showForm(id: number) {
        this.formService.getForm(id).subscribe(
            data => {
                this.form = data;
                this.trackChanges(true);
                this.ref.detectChanges();
            },
            error => {
                this.alertService.error("Error loading form! " + error);
            }
        );
    }

}

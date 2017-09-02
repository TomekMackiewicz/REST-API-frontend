import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormService } from './form.service';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { AlertService } from '../alert/alert.service';

@Component({
    selector: 'form-list',
    templateUrl: './form-list.component.html',
})

export class FormListComponent implements OnInit {

    public forms: any;
    public categories: any;

    constructor(
        private formService: FormService,
        private loaderService: LoaderService,
        private alertService: AlertService,
        private ref: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.loaderService.displayLoader(true);
        this.getForms();
        this.getCategories();
        this.loaderService.displayLoader(false);
    }

    getForms() {
        this.formService.getForms().subscribe(
            data => {
                this.forms = data;
                this.ref.detectChanges();
            },
            error => {
                this.alertService.error("Error loading forms! " + error);
                return Observable.throw(error);
            }  
        );
    }

    getCategories() {
        this.formService.getCategories().subscribe(
            data => {
                this.categories = data;
                this.ref.detectChanges();
            },
            error => {
                this.alertService.error("Error loading categories! " + error);
                return Observable.throw(error);
            }  
        );
    }

    deleteForm(form: any) {
        if (confirm("Are you sure you want to delete " + form.name + "?")) {
            this.loaderService.displayLoader(true);
            this.formService.deleteForm(form).subscribe(
                data => {
                    this.getForms();
                    this.loaderService.displayLoader(false); // czy tu potrzebne?                   
                    this.ref.markForCheck(); // czy tu potrzebne?
                    this.alertService.success("Form deleted.");
                },
                error => {
                    this.loaderService.displayLoader(false);
                    this.ref.markForCheck();
                    this.alertService.success("Error deleting form!" + error);
                    return Observable.throw(error);
                }
            );
        }
    }

}


import { Component, OnInit } from '@angular/core';
import { FormService } from './form.service';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-form-list',
    templateUrl: './form-list.component.html',
})

export class FormListComponent implements OnInit {

    public forms: any;
    public categories: any;

    constructor(private formService: FormService) {}

    ngOnInit() {
        this.getForms();
        this.getCategories();
    }

    getForms() {
        this.formService.getForms().subscribe(
            data => {this.forms = data},
            err => console.error(err),
            () => console.log('done loading forms')
        );
    }

    getCategories() {
        this.formService.getCategories().subscribe(
            data => {this.categories = data},
            err => console.error(err),
            () => console.log('done loading categories')
        );
    }

    deleteForm(form: any) {
        if (confirm("Are you sure you want to delete " + form.name + "?")) {
            this.formService.deleteForm(form).subscribe(
                data => {
                    this.getForms();
                    return true;
                },
                error => {
                    console.error("Error deleting form!");
                    return Observable.throw(error);
                }
            );
        }
    }

}


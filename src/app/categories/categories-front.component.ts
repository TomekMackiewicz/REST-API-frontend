import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Rx';
import { Category } from './model/category';
import { Form } from '../form/model/form';
import { CategoriesService } from './categories.service';
import { LoaderService } from '../services/loader.service';
import { AlertService } from '../alert/alert.service';

@Component({
    selector: 'categories-front',
    templateUrl: './categories-front.component.html'
})

export class CategoriesFrontComponent implements OnInit {

    private category: Category;
    private filteredForms: Array<Form> = [];

    constructor(
        private categoriesService: CategoriesService,
        private route: ActivatedRoute,
        private loaderService: LoaderService,
        private alertService: AlertService,
        private ref: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.loaderService.displayLoader(true);
        this.route.params
            .switchMap((params: Params) => this.categoriesService.getCategory(+params['category']))
            .subscribe(
                data => { 
                    this.loaderService.displayLoader(false);
                    this.category = data;
                    this.filteredForms = [];
                    this.filterForms(this.category.forms);
                    this.ref.detectChanges();
                },
                error => {
                    this.loaderService.displayLoader(false);
                    this.alertService.error("Error loading category! " + error);
                    this.ref.detectChanges();
                    
                    return Observable.throw(error);
                }                
            );
    }
    
    /**
     * To show only the forms with assigned document
     */
    filterForms(forms: Array<Form>) {
        for(let form of forms) {
            if(form.document !== null) {
                this.filteredForms.push(form);                
            }
        }
    }
        
}


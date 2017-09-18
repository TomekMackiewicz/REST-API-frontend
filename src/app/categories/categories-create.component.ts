import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Rx';
import { CategoriesService } from './categories.service';
import { AlertService } from '../alert/alert.service';
import { LoaderService } from '../services/loader.service';
import { Category } from './model/category';
//import { slideInOutAnimation } from '../animations/index';

@Component({
    selector: 'category-create',
    templateUrl: './categories-create.component.html',
    //animations: [slideInOutAnimation],
    //host: { '[@slideInOutAnimation]': '' }    
})

export class CategoriesCreateComponent {

    public category: Category;

    constructor(
        private categoriesService: CategoriesService,
        private alertService: AlertService,
        private loaderService: LoaderService,
        private route: ActivatedRoute,
        private location: Location,
        private ref: ChangeDetectorRef
    ) {}

    goBack(): void {
        this.location.back();
    }

    createCategory(name: any) {
        let category = {name: name};
        this.loaderService.displayLoader(true);
        this.categoriesService.createCategory(category).subscribe(
            data => {
                this.loaderService.displayLoader(false);
                this.alertService.success('Category created.');
                this.ref.markForCheck();
            },
            error => {
                this.loaderService.displayLoader(false);
                this.alertService.error("Error saving category! " + error);
                this.ref.markForCheck();
                return Observable.throw(error);
            }
        );
    }

}


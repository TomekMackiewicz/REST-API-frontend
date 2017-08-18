import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Rx';
import { CategoriesService } from './categories.service';
import { AlertService } from '../alert/alert.service';
import { LoaderService } from '../services/loader.service';
import { slideInOutAnimation } from '../animations/index';

@Component({
    selector: 'category-edit',
    templateUrl: './categories-edit.component.html',
    animations: [slideInOutAnimation],
    host: { '[@slideInOutAnimation]': '' }    
})

export class CategoriesEditComponent implements OnInit {

    public category;

    constructor(
        private categoriesService: CategoriesService,
        private route: ActivatedRoute,
        private location: Location,
        private alertService: AlertService,
        private loaderService: LoaderService
    ) {}

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.categoriesService.getCategory(+params['id']))
            .subscribe(category => this.category = category);
    }

    goBack(): void {
        this.location.back();
    }

    updateCategory(category) {
        this.loaderService.displayLoader(true);
        this.categoriesService.updateCategory(category).subscribe(
            data => {
                this.loaderService.displayLoader(false);
                this.alertService.success('Category updated.');
                return true;
            },
            error => {
                this.loaderService.displayLoader(false);
                this.alertService.error("Error saving category! " + error);
                return Observable.throw(error);
            }
        );
    }

}

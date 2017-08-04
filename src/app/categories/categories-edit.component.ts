import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Rx';
import { CategoriesService } from './categories.service';
import { AlertService } from '../alert/alert.service';
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
        private alertService: AlertService
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
        this.categoriesService.updateCategory(category).subscribe(
            data => {
                this.alertService.success('Category updated.');
                return true;
            },
            error => {
                this.alertService.error("Error saving category! " + error);
                return Observable.throw(error);
            }
        );
    }

}

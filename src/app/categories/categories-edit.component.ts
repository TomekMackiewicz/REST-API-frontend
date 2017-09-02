import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Rx';
import { CategoriesService } from './categories.service';
import { AlertService } from '../alert/alert.service';
import { LoaderService } from '../services/loader.service';
//import { slideInOutAnimation } from '../animations/index';

@Component({
    selector: 'categories-edit',
    templateUrl: './categories-edit.component.html',
    //animations: [slideInOutAnimation],
    //host: { '[@slideInOutAnimation]': '' }    
})

export class CategoriesEditComponent implements OnInit {

    public category: Object;

    constructor(
        private categoriesService: CategoriesService,
        private route: ActivatedRoute,
        private location: Location,
        private alertService: AlertService,
        private loaderService: LoaderService,
        private ref: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.loaderService.displayLoader(true);
        this.route.params
            .switchMap((params: Params) => this.categoriesService.getCategory(+params['id']))
            .subscribe(
                data => { 
                    this.loaderService.displayLoader(false);
                    this.category = data; 
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

    goBack(): void {
        this.location.back();
    }

    updateCategory(category: any) {
        this.loaderService.displayLoader(true);
        this.categoriesService.updateCategory(category).subscribe(
            data => {
                this.loaderService.displayLoader(false);
                this.alertService.success('Category updated.');
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

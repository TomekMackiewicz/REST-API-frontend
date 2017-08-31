import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Rx';
import { CategoriesService } from './categories.service';
import { LoaderService } from '../services/loader.service';
import { AlertService } from '../alert/alert.service';

@Component({
    selector: 'categories-front',
    templateUrl: './categories-front.component.html'
})

export class CategoriesFrontComponent implements OnInit {

    public category: any;

    constructor(
        private categoriesService: CategoriesService,
        private route: ActivatedRoute,
        private loaderService: LoaderService,
        private alertService: AlertService
    ) {}

    ngOnInit(): void {
        this.loaderService.displayLoader(true);
        this.route.params
            .switchMap((params: Params) => this.categoriesService.getCategory(+params['category']))
            .subscribe(
                data => { 
                    this.loaderService.displayLoader(false);
                    this.category = data; 
                },
                error => {
                    this.loaderService.displayLoader(false);
                    this.alertService.error("Error loading category! " + error);
                    return Observable.throw(error);
                }                
            );
    }

}


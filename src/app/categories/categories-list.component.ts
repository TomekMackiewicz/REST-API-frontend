import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { CategoriesService } from './categories.service';
import { LoaderService } from '../services/loader.service';
import { AlertService } from '../alert/alert.service';

@Component({
    selector: 'categories-list',
    templateUrl: './categories-list.component.html'  
})

export class CategoriesComponent implements OnInit {

    public categories: Array<Object>;

    constructor(
        private categoriesService: CategoriesService,
        private loaderService: LoaderService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.getCategories();
    }

    getCategories() {
        this.loaderService.displayLoader(true);
        this.categoriesService.getCategories().subscribe(
            data => {
                this.categories = data;
                this.loaderService.displayLoader(false);
            },
            error => {
                this.alertService.error("Error loading categories! " + error);
                this.loaderService.displayLoader(false);
                return Observable.throw(error);
            }
        );
    }

    deleteCategory(category: any) {
        if (confirm("Are you sure you want to delete " + category.name + "?")) {
            this.loaderService.displayLoader(true);
            this.categoriesService.deleteCategory(category).subscribe(
                data => {
                    this.getCategories();
                    this.loaderService.displayLoader(false);
                },
                error => {
                    this.loaderService.displayLoader(false);
                    this.alertService.error("Error deleting category! " + error);
                    return Observable.throw(error);
                }
            );
        }
    }

}

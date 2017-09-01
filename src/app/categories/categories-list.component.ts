import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
        private alertService: AlertService,
        private ref: ChangeDetectorRef
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
                this.ref.detectChanges();
            },
            error => {
                this.alertService.error("Error loading categories! " + error);
                this.loaderService.displayLoader(false);
                this.ref.detectChanges();
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
                    this.loaderService.displayLoader(false); // potrzebne tu?
                    this.ref.markForCheck(); // potrzebne tu?
                },
                error => {
                    this.loaderService.displayLoader(false);
                    this.ref.markForCheck();                    
                    this.alertService.error("Error deleting category! " + error);
                    return Observable.throw(error);
                }
            );
        }
    }

}

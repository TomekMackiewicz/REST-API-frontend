import { Component, ChangeDetectorRef } from '@angular/core';
import { CategoriesService } from '../categories/categories.service';
import { FormService } from '../form/form.service';
import { AlertService } from '../alert/alert.service';
import { LoaderService } from '../services/loader.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})

export class MenuComponent {

    public categories: any;
    public forms: any;

    constructor(
        private categoriesService: CategoriesService,
        private formService: FormService,
        private alertService: AlertService,
        private loaderService: LoaderService,
        private ref: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.loaderService.displayLoader(true);
        this.getCategories();
        this.getForms();
        this.loaderService.displayLoader(false);
    }

    getCategories() {
        this.categoriesService.getCategories().subscribe(
            data => {
                this.categories = data;
                this.ref.detectChanges();
            },
            error => {
                this.alertService.error("Error loading categories! " + error);
                this.ref.detectChanges();
            }
        );
    }

    getForms() {
        this.formService.getForms().subscribe(
            data => {
                this.forms = data;
                this.ref.detectChanges();
            },
            error => {
                this.alertService.error("Error loading forms! " + error);
                this.ref.detectChanges();
            }
        );
    }

}

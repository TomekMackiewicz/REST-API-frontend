import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './categories.service';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-document-categories',
    templateUrl: './document-categories.component.html',
    styleUrls: ['./document-categories.component.css'],   
})

export class CategoriesComponent implements OnInit {

    public categories;

    constructor(private categoriesService: CategoriesService) {}

    ngOnInit() {
        this.getCategories();
    }

    getCategories() {
        this.categoriesService.getCategories().subscribe(
            data => {this.categories = data},
            err => console.error(err),
            () => console.log('done loading categories')
        );
    }

    deleteCategory(category) {
        if (confirm("Are you sure you want to delete " + category.name + "?")) {
            this.categoriesService.deleteCategory(category).subscribe(
                data => {
                    this.getCategories();
                    return true;
                },
                error => {
                    console.error("Error deleting category!");
                    return Observable.throw(error);
                }
            );
        }
    }

}

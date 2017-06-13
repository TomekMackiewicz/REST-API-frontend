import {Component, OnInit} from '@angular/core';
import {DocumentCategoriesService} from './document-categories.service';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'app-document-categories',
    templateUrl: './document-categories.component.html',
    styleUrls: ['./document-categories.component.css']
})
export class DocumentCategoriesComponent implements OnInit {

    public categories;

    constructor(private documentCategoriesService: DocumentCategoriesService) {}

    ngOnInit() {
        this.getCategories();
    }

    getCategories() {
        this.documentCategoriesService.getCategories().subscribe(
            data => {this.categories = data},
            err => console.error(err),
            () => console.log('done loading categories')
        );
    }

    deleteCategory(category) {
        if (confirm("Are you sure you want to delete " + category.name + "?")) {
            this.documentCategoriesService.deleteCategory(category).subscribe(
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

import {Component, OnInit} from '@angular/core';
import {CrudService} from '../services/crud.service';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'app-document-categories',
    templateUrl: './document-categories.component.html',
    styleUrls: ['./document-categories.component.css']
})
export class DocumentCategoriesComponent implements OnInit {

    public categories;

    constructor(private _crudService: CrudService) {}

    ngOnInit() {
        this.getCategories();
    }

    getCategories() {
        this._crudService.getCategories().subscribe(
            data => {this.categories = data},
            err => console.error(err),
            () => console.log('done loading categories')
        );
    }

    deleteCategory(category) {
        if (confirm("Are you sure you want to delete " + category.name + "?")) {
            this._crudService.deleteCategory(category).subscribe(
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

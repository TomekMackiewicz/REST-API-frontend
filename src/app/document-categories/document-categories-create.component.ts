import {Component} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Rx';
import {CrudService} from '../services/crud.service';
import {AlertService} from '../services/alert.service';

@Component({
    selector: 'document-category-create',
    templateUrl: './document-categories-create.component.html',
})

export class DocumentCategoriesCreateComponent {

    public category;

    constructor(
        private _crudService: CrudService,
        private alertService: AlertService,        
        private route: ActivatedRoute,
        private location: Location
    ) {}

    goBack(): void {
        this.location.back();
    }

    createCategory(name) {
        let category = {name: name};
        this._crudService.createCategory(category).subscribe(
            data => {
                this.alertService.success('Category created.');
                return true;
            },
            error => {
                this.alertService.error("Error saving category! " + error);
                return Observable.throw(error);
            }
        );
    }

}


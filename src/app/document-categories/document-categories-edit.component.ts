import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Rx';
import {CrudService} from '../services/crud.service';
import {AlertService} from '../services/alert.service';

@Component({
    selector: 'document-category-edit',
    templateUrl: './document-categories-edit.component.html',
})

export class DocumentCategoriesEditComponent implements OnInit {

    public category;

    constructor(
        private _crudService: CrudService,
        private route: ActivatedRoute,
        private location: Location,
        private alertService: AlertService
    ) {}

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this._crudService.getCategory(+params['id']))
            .subscribe(category => this.category = category);
    }

    goBack(): void {
        this.location.back();
    }

    updateCategory(category) {
        this._crudService.updateCategory(category).subscribe(
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

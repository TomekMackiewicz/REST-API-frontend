import {Component} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Rx';
import {DocumentCategoriesService} from './document-categories.service';
import {AlertService} from '../alert/alert.service';
import {slideInOutAnimation} from '../animations/index';

@Component({
    selector: 'document-category-create',
    templateUrl: './document-categories-create.component.html',
    animations: [slideInOutAnimation],
    host: { '[@slideInOutAnimation]': '' }    
})

export class DocumentCategoriesCreateComponent {

    public category;

    constructor(
        private documentCategoriesService: DocumentCategoriesService,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    goBack(): void {
        this.location.back();
    }

    createCategory(name) {
        let category = {name: name};
        this.documentCategoriesService.createCategory(category).subscribe(
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


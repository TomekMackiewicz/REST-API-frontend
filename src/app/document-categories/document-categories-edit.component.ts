import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Rx';
import {DocumentCategoriesService} from './document-categories.service';
import {AlertService} from '../alert/alert.service';
import {slideInOutAnimation} from '../animations/index';

@Component({
    selector: 'document-category-edit',
    templateUrl: './document-categories-edit.component.html',
    animations: [slideInOutAnimation],
    host: { '[@slideInOutAnimation]': '' }    
})

export class DocumentCategoriesEditComponent implements OnInit {

    public category;

    constructor(
        private documentCategoriesService: DocumentCategoriesService,
        private route: ActivatedRoute,
        private location: Location,
        private alertService: AlertService
    ) {}

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.documentCategoriesService.getCategory(+params['id']))
            .subscribe(category => this.category = category);
    }

    goBack(): void {
        this.location.back();
    }

    updateCategory(category) {
        this.documentCategoriesService.updateCategory(category).subscribe(
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

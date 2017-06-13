import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Rx';
import {DocumentCategoriesService} from './document-categories.service';

@Component({
    selector: 'app-category',
    templateUrl: './document-categories-front.component.html',
    //styleUrls: ['./category.component.css'],
})

export class DocumentCategoriesFrontComponent implements OnInit {

    public category: any;

    constructor(
        private documentCategoriesService: DocumentCategoriesService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.documentCategoriesService.getCategory(+params['category']))
            .subscribe(category => this.category = category);
    }

    //    getCategory(id) {
    //        this.crudService.getCategory(id).subscribe(
    //            data => {this.category = data},
    //            err => console.error(err),
    //            () => console.log('done loading category')
    //        );
    //    }

}


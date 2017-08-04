import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Rx';
import { CategoriesService } from './categories.service';

@Component({
    selector: 'category-front',
    templateUrl: './categories-front.component.html',
    //styleUrls: ['./category.component.css'],
})

export class CategoriesFrontComponent implements OnInit {

    public category: any;

    constructor(
        private categoriesService: CategoriesService,
        private route: ActivatedRoute,
        private location: Location // usunąć
    ) {}

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.categoriesService.getCategory(+params['category']))
            .subscribe(category => this.category = category);
        console.log(this.category);
    }

    //    getCategory(id) {
    //        this.crudService.getCategory(id).subscribe(
    //            data => {this.category = data},
    //            err => console.error(err),
    //            () => console.log('done loading category')
    //        );
    //    }

}


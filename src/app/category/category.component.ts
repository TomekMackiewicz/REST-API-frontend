import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Rx';
import {CrudService} from '../services/crud.service';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    //styleUrls: ['./category.component.css'],
})

export class CategoryComponent implements OnInit {

    public category: any;

    constructor(       
        private crudService: CrudService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.crudService.getCategory(+params['category']))
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

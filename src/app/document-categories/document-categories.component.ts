import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {DocumentCategoriesService} from './document-categories.service';
import {Observable} from 'rxjs/Rx';

import {Router, ActivatedRoute} from '@angular/router';
import {trigger, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';

const fadeIn = [
    query(':leave', style({ position: 'absolute', left: 0, right: 0, opacity: 1 })),
    query(':enter', style({ position: 'absolute', left: 0, right: 0, opacity: 0 })),
    group([
        query(':leave',
            animate('.6s', style({ opacity: 0 }))),
        query(':enter',
            animate('.6s .6s', style({ opacity: 1 })))
    ])
];

@Component({
    selector: 'app-document-categories',
    templateUrl: './document-categories.component.html',
    styleUrls: ['./document-categories.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('routerAnimations', [
            transition('* => *', fadeIn)
        ])
    ]    
})
export class DocumentCategoriesComponent implements OnInit {

    public categories;

    constructor(private documentCategoriesService: DocumentCategoriesService) {}

    ngOnInit() {
        this.getCategories();
    }

    prepareRouteTransition(outlet) {
        const animation = outlet.activatedRouteData['animation'] || {};
        return animation['value'] || null;
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

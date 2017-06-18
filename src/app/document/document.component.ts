import {Component, ViewEncapsulation} from '@angular/core';
import {DocumentService} from './document.service';
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
    selector: 'app-document',
    templateUrl: './document.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('routerAnimations', [
            transition('* => *', fadeIn)
        ])
    ]    
})
export class DocumentComponent {

    public documents: any;
    public categories: any;

    constructor(private documentService: DocumentService) {}

    ngOnInit() {
        this.getDocuments();
        this.getCategories();
    }

    prepareRouteTransition(outlet) {
        const animation = outlet.activatedRouteData['animation'] || {};
        return animation['value'] || null;
    }

    getDocuments() {
        this.documentService.getDocuments().subscribe(
            data => {this.documents = data},
            err => console.error(err),
            () => console.log('done loading documents')
        );
    }

    getCategories() {
        this.documentService.getCategories().subscribe(
            data => {this.categories = data},
            err => console.error(err),
            () => console.log('done loading categories')
        );
    }

    deleteDocument(document: any) {
        if (confirm("Are you sure you want to delete " + document.title + "?")) {
            this.documentService.deleteDocument(document).subscribe(
                data => {
                    this.getDocuments();
                    return true;
                },
                error => {
                    console.error("Error deleting document!");
                    return Observable.throw(error);
                }
            );
        }
    }

}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Rx';
import {DocumentService} from './document.service';
import {AlertService} from '../alert/alert.service';

@Component({
    selector: 'document-edit',
    templateUrl: './document-edit.component.html',
})

export class DocumentEditComponent implements OnInit {

    public document: any;
    public categories: any;
    public categoriesArray: Array<{id: number, name: string}> = [];

    constructor(
        private documentService: DocumentService,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.documentService.getDocument(+params['id']))
            .subscribe(document => this.document = document);
        this.getCategories();
    }
    
    
    /*
     * Push categories already assigned to this document
     * to an array used in updateDocument method
     * and check already assigned categories in the template.
     */
    documentCategories(document: any, categories: any) {
        for (let documentCategory of document.categories) {
            this.categoriesArray.push({id: documentCategory.id, name: documentCategory.name});
        }           
        for (let category of categories) {
            for (let categoryDocument of category.documents) {
                if (categoryDocument.id === document.id) {
                    category.checked = true;
                }                
            }
        }
    }

    onChange(id: number, name: string, isChecked: boolean) {
        if (isChecked) {
            if (this.categoriesArray.some(x => x.name === name)) {
                return;
            } else {
                this.categoriesArray.push({id: id, name: name});
            }
        } else {
            let index: number = this.categoriesArray.indexOf(this.categoriesArray.find(x => x.name === name));
            this.categoriesArray.splice(index, 1);
        }
        return this.categoriesArray;
    }

    updateDocument(id: number, title: string, body: any) {
        let document = {id: id, title: title, body: body, categories: this.categoriesArray};
        this.documentService.updateDocument(document).subscribe(
            data => {
                this.alertService.success('Document updated.');
                return true;
            },
            error => {
                this.alertService.error("Error updating document! " + error);
                return Observable.throw(error);
            }
        );
    }

    getCategories() {
        this.documentService.getCategories().subscribe(
            data => {this.categories = data},
            err => console.error(err),
            () => this.documentCategories(this.document, this.categories)
        );
    }

    goBack(): void {
        this.location.back();
    }

}

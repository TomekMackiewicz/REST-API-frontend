import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Rx';
import {CrudService} from '../services/crud.service';
import {AlertService} from '../services/alert.service';

@Component({
    selector: 'document-detail',
    templateUrl: './document-edit.component.html',
})

export class DocumentEditComponent implements OnInit {

    public document;
    public categories;
    public categoriesArray: Array<{id: number, name: string}> = [];

    constructor(
        private crudService: CrudService,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.crudService.getDocument(+params['id']))
            .subscribe(document => this.document = document);
        this.getCategories();
        this.getDocument(this.route.params['_value']['id']);
    }

    getInitialCategories(document) {
        for (let initialCategory of this.document.categories) {
            this.categoriesArray.push({id:initialCategory.id, name: initialCategory.name});
        }
        console.log(this.categoriesArray);        
    }

    checkIfCategoryAssigned(categoryDocuments, documentId) {
        for (let document of categoryDocuments) {
            if (document.id === documentId) {
                return true;
            } else {
                return false;
            }
        }
    }

    goBack(): void {
        this.location.back();
    }

    onChange(id, name, isChecked: boolean) {
        if(isChecked) {
            if(this.categoriesArray.some(x => x.name === name)) {
                console.log(this.categoriesArray);
                return;
            } else {
                this.categoriesArray.push({id:id, name:name});
                console.log(this.categoriesArray);
            }
        } else {
            let index: number = this.categoriesArray.indexOf(this.categoriesArray.find(x => x.name === name));
            this.categoriesArray.splice(index, 1);
            console.log(this.categoriesArray);
        }
        return this.categoriesArray;
    }

    updateDocument(id, title, body) {
        let document = {id: id, title: title, body: body, categories: this.categoriesArray};
        this.crudService.updateDocument(document).subscribe(
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
        this.crudService.getCategories().subscribe(
            data => {this.categories = data},
            err => console.error(err),
            () => console.log('done loading categories')
        );
    }

    getDocument(id) {
        this.crudService.getDocument(id).subscribe(
            data => {this.document = data},
            err => console.error(err),
            () => this.getInitialCategories(this.document)
        );
    }

}

import {Component} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Rx';
import {CrudService} from '../services/crud.service';
import {AlertService} from '../services/alert.service';

@Component({
    selector: 'document-create',
    templateUrl: './document-create.component.html',
})

export class DocumentCreateComponent {

    public document;
    public categories;
    public categoriesArray: Array<{id: number, name: string}> = [];
    
    constructor(
        private _crudService: CrudService,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit() {
        this.getCategories();
    }

    goBack(): void {
        this.location.back();
    }

    onChange(id, name, isChecked: boolean) {
        if(isChecked) {
            if(this.categoriesArray.some(x => x.name === name)) {
                console.log('Already in array');
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

    createDocument(title, body) {
        let document = {title: title, body: body, categories: this.categoriesArray};
        console.log(document);

        this._crudService.createDocument(document).subscribe(
            data => {
                this.alertService.success('Document created.');
                return true;
            },
            error => {
                this.alertService.error("Error saving document! " + error);
                return Observable.throw(error);
            }
        );
    }

    getCategories() {
        this._crudService.getCategories().subscribe(
            data => {this.categories = data},
            err => console.error(err),
            () => console.log('done loading categories')
        );
    }

}

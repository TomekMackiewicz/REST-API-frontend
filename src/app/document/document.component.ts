import {Component} from '@angular/core';
import {CrudService} from '../services/crud.service';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'demo-app',
    templateUrl: './document.component.html',
})
export class DocumentComponent {

    public documents;
    public categories;

    constructor(private _crudService: CrudService) {}

    ngOnInit() {
        this.getDocuments();
        this.getCategories();
    }

    //    getDocument(id) {
    //        this._demoService.getDocument().subscribe(
    //            data => {this.document = data},
    //            err => console.error(err),
    //            () => console.log('done loading document')
    //        );
    //    }

    getDocuments() {
        this._crudService.getDocuments().subscribe(
            data => {this.documents = data},
            err => console.error(err),
            () => console.log('done loading documents')
        );
    }

    getCategories() {
        this._crudService.getCategories().subscribe(
            data => {this.categories = data},
            err => console.error(err),
            () => console.log('done loading categories')
        );
    }

    deleteDocument(document) {
        if (confirm("Are you sure you want to delete " + document.title + "?")) {
            this._crudService.deleteDocument(document).subscribe(
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

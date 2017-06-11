import {Component} from '@angular/core';
import {CrudService} from '../../services/crud.service';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'my-dashboard',
    templateUrl: './dashboard.html'
})

export class DashboardComponent {

    public documents;
    public document_name;

    constructor(private _crudService: CrudService) {}

    ngOnInit() {
        this.getDocuments();
    }

    getDocuments() {
        this._crudService.getDocuments().subscribe(
            data => {this.documents = data},
            err => console.error(err),
            () => console.log('done loading documents')
        );
    }

}

import {Component} from '@angular/core';
import {CrudService} from '../services/crud.service';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'my-dashboard',
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent {

    public documents: any;

    constructor(private crudService: CrudService) {}

    ngOnInit() {
        this.getDocuments();
    }

    getDocuments() {
        this.crudService.getDocuments().subscribe(
            data => {this.documents = data},
            err => console.error(err),
            () => console.log('done loading documents')
        );
    }

}

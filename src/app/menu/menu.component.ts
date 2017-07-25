import {Component} from '@angular/core';
import {CrudService} from '../services/crud.service';
import { FormService } from '../form/form.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})

export class MenuComponent {

    public categories: any;
    public forms: any;

    constructor(
        private crudService: CrudService,
        private formService: FormService
    ) {}

    ngOnInit() {
        this.getCategories();
        this.getForms();
    }

    getCategories() {
        this.crudService.getCategories().subscribe(
            data => {this.categories = data},
            err => console.error(err),
            () => console.log('done loading categories')
        );
    }

    getForms() {
        this.formService.getForms().subscribe(
            data => {this.forms = data},
            err => console.error(err),
            () => console.log('done loading forms')
        );
    }

}

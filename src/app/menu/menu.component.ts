import {Component} from '@angular/core';
import {CrudService} from '../services/crud.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})

export class MenuComponent {

    public categories: any;

    constructor(private crudService: CrudService) {}

    ngOnInit() {
        this.getCategories();
    }

    getCategories() {
        this.crudService.getCategories().subscribe(
            data => {this.categories = data},
            err => console.error(err),
            () => console.log('done loading categories')
        );
    }

}
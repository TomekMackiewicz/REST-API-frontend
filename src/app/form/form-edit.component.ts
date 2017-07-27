import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Rx';
import { FormService } from './form.service';
import { AlertService } from '../alert/alert.service';
import { slideInOutAnimation } from '../animations/index';

@Component({
    selector: 'form-edit',
    templateUrl: './form-edit.component.html',
    animations: [slideInOutAnimation],
    host: { '[@slideInOutAnimation]': '' }    
})

export class FormEditComponent implements OnInit {

    public form: any;
    //public categories: any;
    //public categoriesArray: Array<{id: number, name: string}> = [];

    constructor(
        private formService: FormService,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.formService.getForm(+params['id']))
            .subscribe(form => this.form = form);
        //this.getCategories();
    }
    
    
//    /*
//     * Push categories already assigned to this document
//     * to an array used in updateDocument method
//     * and check already assigned categories in the template.
//     */
//    documentCategories(document: any, categories: any) {
//        for (let documentCategory of document.categories) {
//            this.categoriesArray.push({id: documentCategory.id, name: documentCategory.name});
//        }           
//        for (let category of categories) {
//            for (let categoryDocument of category.documents) {
//                if (categoryDocument.id === document.id) {
//                    category.checked = true;
//                }                
//            }
//        }
//    }

//    onChange(id: number, name: string, isChecked: boolean) {
//        if (isChecked) {
//            if (this.categoriesArray.some(x => x.name === name)) {
//                return;
//            } else {
//                this.categoriesArray.push({id: id, name: name});
//            }
//        } else {
//            let index: number = this.categoriesArray.indexOf(this.categoriesArray.find(x => x.name === name));
//            this.categoriesArray.splice(index, 1);
//        }
//        return this.categoriesArray;
//    }

    updateForm(id: number, name: string, body: any) {
        //let form = {id: id, name: name, body: body, categories: this.categoriesArray};
        let form = {id: id, name: name, body: body};
        this.formService.updateForm(form).subscribe(
            data => {
                this.alertService.success('Form updated.');
                return true;
            },
            error => {
                this.alertService.error("Error updating form! " + error);
                return Observable.throw(error);
            }
        );
    }

//    getCategories() {
//        this.documentService.getCategories().subscribe(
//            data => {this.categories = data},
//            err => console.error(err),
//            () => this.documentCategories(this.document, this.categories)
//        );
//    }

    goBack(): void {
        this.location.back();
    }

}


import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Location } from '@angular/common';
import { Form } from './models/form';
import { FormConfig } from './models/form-config';
import { Question } from './models/question';
import { Option } from './models/option';

import { FormService } from './form.service';
import { AlertService } from '../alert/alert.service';

import { slideInOutAnimation } from '../animations/index';

@Component({
    selector: 'form-edit',
    templateUrl: './form-edit.component.html',
    animations: [slideInOutAnimation],
    host: {'[@slideInOutAnimation]': ''}
})

export class FormEditComponent implements OnInit {

    public form: any; 
    public categories: any;     
    public types = [
        { value: 'text', display: 'Text' },
        { value: 'radio', display: 'Radio' },
        { value: 'checkbox', display: 'Checkbox' }
    ];
        
    constructor(
        private http: Http,
        private location: Location,
        private formService: FormService,
        private alertService: AlertService,
        private route: ActivatedRoute        
    ) {}

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.formService.getForm(+params['id']))
            .subscribe(form => {this.form = form});
        this.getCategories();    
    }       

    getCategories() {
        this.formService.getCategories().subscribe(
            data => { this.categories = data },
            err => console.error(err),
            () => { 
                this.checkCategories(this.categories, this.form.categories);
                console.log('done loading categories'); 
            }
        );
    }

    checkCategories(allCategories, formCategories) {
        var res = allCategories.filter(function(v) {
            return formCategories.indexOf(v) > -1;
        });
        console.log(allCategories); 
        console.log(formCategories);        
    }

//    /*
//     * Push categories already assigned to this form
//     */
//    formCategories() {
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

    addQuestion(form: NgForm) {
        let values = form.value;                   
        let data = {        
            name: values.name,
            questionType: values.questionType,
            options: [],                  
        };
        this.form.questions.push(data);                                
    }
    
    deleteQuestion(id: number, name: string) {
        if (confirm("Are you sure you want to delete " + name + "?")) {        
            let index: number = this.form.questions.indexOf(this.form.questions.find(x => x.name === name));
            this.form.questions.splice(index, 1);
            if(typeof id !== 'undefined') {
                this.formService.deleteQuestion(id).subscribe(
                    data => {
                        return true;
                    },
                    error => {
                        console.error("Error deleting question!");
                        return Observable.throw(error);
                    }
                );                           
            }
        }                        
    }      
        
    addOption(question: any, name: string) {
        let data = {        
            name: name                
        };                         
        question.options.push(data);       
    }

    deleteOption(question: any, id: number, name: string) {
        if (confirm("Are you sure you want to delete " + name + "?")) {        
            let index: number = question.options.indexOf(question.options.find(x => x.name === name));
            question.options.splice(index, 1);
            if(typeof id !== 'undefined') {
                this.formService.deleteOption(id).subscribe(
                    data => {
                        return true;
                    },
                    error => {
                        console.error("Error deleting option!");
                        return Observable.throw(error);
                    }
                );                           
            }
        }                          
    }

    submitMainForm(mainForm: NgForm) {
        let values = mainForm.value; 
        let config = {
            id: this.form.config.id,
            allowBack: values.allowBack,
            autoMove: values.autoMove,
            requiredAll: values.requiredAll,
            shuffleQuestions: values.shuffleQuestions,
            shuffleOptions: values.shuffleOptions,
            showPager: values.showPager 
        }     
        let data = {        
            id: this.form.id,
            name: values.name,
            description: values.description,
            config: config,
            questions: this.form.questions                
        };                                 
        let form = new Form(data);
        let serializedForm = JSON.stringify(form);       
        this.formService.updateForm(this.form).subscribe(
            data => {
                this.alertService.success('form updated.');
                return true;
            },
            error => {
                this.alertService.error("Error updating form! " + error);
                return Observable.throw(error);
            }
        );
    }    

    goBack(): void {
        this.location.back();
    } 
                 
}

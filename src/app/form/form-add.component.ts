import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Location } from '@angular/common';
import { Form } from './models/form';
import { FormConfig } from './models/form-config';
import { Question } from './models/question';
import { Option } from './models/option';
import { FormService } from './form.service';
import { AlertService } from '../alert/alert.service';
import { LoaderService } from '../services/loader.service';
import { slideInOutAnimation } from '../animations/index';

@Component({
    selector: 'form-add',
    templateUrl: './form-add.component.html',
    animations: [slideInOutAnimation],
    host: {'[@slideInOutAnimation]': ''}
})

export class FormAddComponent implements OnInit {
    
    private formOptions;
    private formConfig;
    private formProperties;
    public form; 
    public categories: any;            
    public types = [
        { value: 'text', display: 'Text' },
        { value: 'radio', display: 'Radio' },
        { value: 'checkbox', display: 'Checkbox' }
    ];
    public checked: boolean = true;
        
    constructor(
        private http: Http,
        private location: Location,
        private formService: FormService,
        private alertService: AlertService,
        private loaderService: LoaderService       
    ) {}

    ngOnInit(): void {
        this.formOptions = {
            allowBack: false,
            autoMove: false, 
            requiredAll: false,
            shuffleQuestions: false,
            shuffleOptions: false,
            showPager: false,
        }    
        this.formConfig = new FormConfig(this.formOptions);
        this.formProperties = {
            name: '',
            description: '',
            config: this.formConfig,
            questions: [],
            categories: []
        }
        this.form = new Form(this.formProperties);
        this.getCategories();
    }       

    getCategories() {
        this.formService.getCategories().subscribe(
            data => {this.categories = data},
            err => console.error(err),
            () => console.log('done loading categories')
        );
    }

    addQuestion(form: NgForm) {
        let values = form.value;                   
        let data = {        
            name: values.name,
            questionType: values.questionType,
            validation: values.validation,
            required: values.required,
            options: []                  
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

    assignCategories(categoryId: number, categoryName: string, isChecked: boolean) {
        if (isChecked) {
            if (this.form.categories.some(x => x.id === categoryId)) {
                return;
            } else {
                this.form.categories.push({id: categoryId, name: categoryName});
            }
        } else {
            let index: number = this.form.categories.indexOf(this.form.categories.find(x => x.id === categoryId));
            this.form.categories.splice(index, 1);
        }
        console.log(this.form.categories);
        return this.form.categories;
    }

    saveForm() { 
        //console.log(this.form);
        this.loaderService.displayLoader(true);    
        this.formService.createForm(this.form).subscribe(
            data => {
                this.loaderService.displayLoader(false);
                this.alertService.success('form created.');
                return true;
            },
            error => {
                this.loaderService.displayLoader(false);
                this.alertService.error("Error creating form! " + error);
                return Observable.throw(error);
            }
        );
    }    

    goBack(): void {
        this.location.back();
    } 
                 
}

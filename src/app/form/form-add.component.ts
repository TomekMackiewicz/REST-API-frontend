import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Location } from '@angular/common';
import { Form, Question, Option, FormConfig } from './models/index';
import { FormService } from './form.service';
import { AlertService } from '../alert/alert.service';
import { LoaderService } from '../services/loader.service';
//import { slideInOutAnimation } from '../animations/index';

@Component({
    selector: 'form-add',
    templateUrl: './form-add.component.html',
    //animations: [slideInOutAnimation],
    //host: {'[@slideInOutAnimation]': ''}
})

export class FormAddComponent implements OnInit {

    private form: Form;        
    private formOptions: any;
    private formProperties: any;
    private formConfig: FormConfig;
    private questions: Array<Question>;
    private options: Array<Option>;
    private categories: any;            
    private checked: boolean = true;
    private selectedType: string = "text";
    private selectedOption: string = "none";
    private isOpen: boolean = false;
    private iterator: number;    
    private types = [
        { value: 'text', display: 'Text' },
        { value: 'radio', display: 'Radio' },
        { value: 'checkbox', display: 'Checkbox' }
    ];
            
    constructor(
        private http: Http,
        private location: Location,
        private formService: FormService,
        private alertService: AlertService,
        private loaderService: LoaderService,
        private ref: ChangeDetectorRef       
    ) {}

    ngOnInit(): void {
        this.formOptions = {
            allowBack: false,
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
            data => {
                this.categories = data;
                this.ref.detectChanges();
            },
            error => {
                this.alertService.error("Error loading categories! " + error);
                return Observable.throw(error);
            } 
        );
    }

    addQuestion(form: NgForm) {                   
        let question = new Question(form.value);
        this.form.questions.push(question);                                
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
                        this.alertService.error("Error deleting question! " + error);
                        return Observable.throw(error);
                    }
                );                           
            }  
        }                      
    }      
        
    addOption(question: Question, name: string) {
        let option = new Option({name: name, questionId: question.id});                        
        question.options.push(option);
        console.log(question.options);       
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
                        this.alertService.error("Error deleting option! " + error);
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
        
        return this.form.categories;
    }

    saveForm() { 
        let i = 0;
        for (let question of this.form.questions) {
            i++;
            question.sequence = i;
        }        
        if(this.form.name !== "") {
            this.loaderService.displayLoader(true);    
            this.formService.createForm(this.form).subscribe(
                data => {
                    this.loaderService.displayLoader(false);
                    this.alertService.success('form created.');
                    this.ref.markForCheck();
                },
                error => {
                    this.loaderService.displayLoader(false);
                    this.alertService.error("Error creating form! " + error);
                    this.ref.markForCheck();
                    return Observable.throw(error);
                }
            );            
        } else {
            this.alertService.error("Form name is required."); 
        }
    }    

    goBack(): void {
        // prompt if any unsaved changes!
        this.location.back();
    } 

    onTypeSelect(selectedType) {
        this.selectedType = selectedType;
    }    

    toogleOpen(iterator: number) {
        this.isOpen = !this.isOpen;
        this.iterator = iterator;
    }    
                         
}

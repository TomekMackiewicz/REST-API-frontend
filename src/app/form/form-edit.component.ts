import { Component, OnInit } from '@angular/core';
//import { FormGroup, FormBuilder } from '@angular/forms';
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
    //public index: number = 0;     
    public types = [
        { value: 'text', display: 'Text' },
        { value: 'radio', display: 'Radio' },
        { value: 'checkbox', display: 'Checkbox' }
    ];
    generateArray(obj){
        return Object.keys(obj).map((key)=>{ return {key:key, value:obj[key]}});
    }
        
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
            .subscribe(form => {this.form = form})
    }       

    addQuestion(form: NgForm) {
        let values = form.value;                   
        let data = {        
            name: values.name,
            questionType: values.questionType,
            options: [],                  
        };
        //let question = new Question(data);
        this.form.questions.push(data);                                
    }
    
    deleteQuestion(name: string) {
        let index: number = this.form.questions.indexOf(this.form.questions.find(x => x.name === name));
        this.form.questions.splice(index, 1);             
    }    
    
    addOption(question, name) {
        //let selectedQuestion = this.questions.find(item => item.name === values.fieldLabel);
        let data = {        
            name: name,
            //isAnswer: true                
        };
        //let option = new Option(data);                         
        question.options.push(data);       
    }

    deleteOption(question, name) {
        let index: number = question.options.indexOf(question.options.find(x => x.name === name));
        question.options.splice(index, 1); ;             
    }

    submitMainForm(mainForm: NgForm) {
        let values = mainForm.value;       
        let data = {        
            id: this.form.id,
            name: values.name,
            description: values.description,
            config: this.form.config,
            questions: this.form.questions                
        };
        //console.log(data);                                 
        let form = new Form(data);
        let serializedForm = JSON.stringify(form);
        //console.log(this.form);
        
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

//    public form: any;
//    private counter = 0;
//    private questionType: string = '';
//    private questionTypeName: string = '';
//    private questions: Array<any> = [];                    
//    private formFields: Array<any> = [];
//    private formField: Object = {
//        label: '',
//        type: '',
//        id: null,
//        name: '',
//        placeholder: '',
//        checkboxFields: [],
//        radioFields: []
//    }
//    private checkboxes: Array<any> = [];
//    private radios: Array<any> = []; 
//    private formOptions = {
//        allowBack: true,
//        allowReview: true,
//        autoMove: true,  // if boolean; it will move to next question automatically when answered.
//        duration: 0,  // indicates the time in which quiz needs to be completed. 0 means unlimited.
//        pageSize: 100,
//        requiredAll: true,  // indicates if you must answer all the questions before submitting.
//        richText: true,
//        shuffleQuestions: false,
//        shuffleOptions: false,
//        showClock: false,
//        showPager: true,
//        theme: ''
//    }    
//    private formConfig = new FormConfig(this.formOptions);
//    public types = [
//        { value: 'text', display: 'Text' },
//        { value: 'radio', display: 'Radio' },
//        { value: 'checkbox', display: 'Checkbox' }
//    ];     
//
//    constructor(
//        private http: Http,
//        private location: Location,
//        private formService: FormService,
//        private alertService: AlertService,
//        private route: ActivatedRoute        
//    ) {}
//
//    ngOnInit(): void {
//        this.route.params
//            .switchMap((params: Params) => this.formService.getForm(+params['id']))
//            .subscribe(form => {
//                this.form = form; 
//                this.counter = this.form.questions.length;              
//                for (let question of this.form.questions) {
//                    if(question.questionType === "checkbox") {
//                        this.checkboxes = question.options;
//                    }  
//                    if(question.questionType === "radio") {
//                        this.radios = question.options;
//                    }                                          
//                    this.formField = {
//                        label: question.name,
//                        type: question.questionType,
//                        id: question.id,
//                        name: 'name',
//                        placeholder: question.questionType,
//                        checkboxFields: this.checkboxes,
//                        radioFields: this.radios
//                    }
//                    this.formFields.push(this.formField);
//                    let values = {name: question.name, questionType: question.questionType};
//                    this.addQuestion(values);
//                    
//                    if(question.questionType === "checkbox") {
//                        //this.checkboxes = question.options;
//                        for (let option of question.options) {
//                            let values = {name: option.name, fieldLabel: question.name};
//                            this.addOption(values);                            
//                        }
//                    }
//                    if(question.questionType === "radio") {
//                        //this.radios = question.options;
//                        for (let option of question.options) {
//                            let values = {name: option.name, fieldLabel: question.name};
//                            this.addOption(values);                            
//                        }                                                 
//                    }                    
//                                                                                
//                }
//            });
//        console.log(this.questions);
//    }       
//
//    addCheckbox(addCheckboxForm: NgForm) {                                 
//        let values = addCheckboxForm.value;
//        let selectedCategory = this.formFields.find(item => item.id === values.fieldId);
//        if (selectedCategory.checkboxFields.some(x => x.label === values.name)) {
//            alert('This checkbox already exists.');
//            return;
//        } else {
//            selectedCategory.checkboxFields.push({
//                label: values.name
//            });            
//        }
//        this.counter++;
//        this.addOption(values);
//
//    }    
//
//    addRadio(addRadioForm: NgForm) {                                
//        let values = addRadioForm.value;
//        let selectedCategory = this.formFields.find(item => item.id === values.fieldId);
//        if (selectedCategory.radioFields.some(x => x.label === values.name)) {
//            alert('This radio already exists.');
//            return;
//        } else {
//            selectedCategory.radioFields.push({
//                label: values.name,
//                id: 'question' + this.counter,
//                name: 'name'
//            });            
//        }         
//        this.counter++;
//        this.addOption(values);
//    }
//                        
//    addFormField(addFormFieldForm: NgForm) {                                 
//        let values = addFormFieldForm.value;        
//        if (this.formFields.some(x => x.label === values.name)) {
//            alert('This question already exists.');
//            return;
//        }                 
//        this.formFields.push({
//            label: values.name,
//            type: values.questionType,
//            id: 'question' + this.counter,
//            name: 'name',
//            placeholder: values.questionType,
//            checkboxFields: [],
//            radioFields: []
//        });
//        this.counter++;
//        this.addQuestion(values);
//    }       
//
//    deleteFormField(label) {
//        let index: number = this.formFields.indexOf(this.formFields.find(x => x.label === label));
//        this.formFields.splice(index, 1);
//        this.deleteQuestion(label);             
//    }
//
//    deleteFormOption(field, optionName, type) {
//        if(type === "checkbox") {
//            let index: number = field.checkboxFields.indexOf(field.checkboxFields.find(x => x.name === optionName));
//            field.checkboxFields.splice(index, 1); 
//        }
//        if(type === "radio") {
//            let index: number = field.radioFields.indexOf(field.radioFields.find(x => x.name === optionName));
//            field.radioFields.splice(index, 1); 
//        }               
//        this.deleteOption(field, optionName);             
//    }
//
//    addQuestion(values) {            
//        let data = {        
//            name: values.name,
//            questionType: values.questionType,
//            options: [],                  
//        };
//        let question = new Question(data);
//        this.questions.push(question);                        
//    }
//
//    addOption(values) {
//        let selectedQuestion = this.questions.find(item => item.name === values.fieldLabel);
//        let data = {        
//            name: values.name,
//            isAnswer: true                
//        };
//        let option = new Option(data);                         
//        selectedQuestion.options.push(option);       
//    }
//
//    deleteQuestion(label) {
//        let index: number = this.questions.indexOf(this.questions.find(x => x.name === label));
//        this.questions.splice(index, 1);              
//    }
//
//    deleteOption(field, optionName) {
//        console.log(this.questions);
//        //let index: number = this.questions.indexOf(this.questions.find(x => x.name === label));
//        //this.questions.splice(index, 1);              
//    }
//
//    submitMainForm(mainForm: NgForm) {
//        let values = mainForm.value;       
//        let data = {        
//            id: this.form.id,
//            name: values.name,
//            description: values.description,
//            config: this.formConfig,
//            questions: this.questions                
//        };
//        //console.log(data);                                 
//        let form = new Form(data);
//        //let serializedForm = JSON.stringify(form);
//        console.log(form);
//        
//        this.formService.updateForm(form).subscribe(
//            data => {
//                this.alertService.success('form updated.');
//                return true;
//            },
//            error => {
//                this.alertService.error("Error updating form! " + error);
//                return Observable.throw(error);
//            }
//        );
//
//    }    
//
//    goBack(): void {
//        this.location.back();
//    }    
                 
}

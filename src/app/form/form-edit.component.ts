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
    private counter = 0;
    private questionType: string = '';
    private questionTypeName: string = '';
    private questions: Array<any> = [];                    
    private formFields: Array<any> = [];
    private formField: Object = {
        label: '',
        type: '',
        id: null,
        name: '',
        placeholder: '',
        checkboxFields: [],
        radioFields: []
    }
    private checkboxes: Array<any> = [];
    private radios: Array<any> = []; 
    private formOptions = {
        allowBack: true,
        allowReview: true,
        autoMove: true,  // if boolean; it will move to next question automatically when answered.
        duration: 0,  // indicates the time in which quiz needs to be completed. 0 means unlimited.
        pageSize: 100,
        requiredAll: true,  // indicates if you must answer all the questions before submitting.
        richText: true,
        shuffleQuestions: false,
        shuffleOptions: false,
        showClock: false,
        showPager: true,
        theme: ''
    }    
    private formConfig = new FormConfig(this.formOptions);
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
            .subscribe(form => {
                this.form = form; 
                this.counter = this.form.questions.length;
                for (let question of this.form.questions) {
                    if(question.questionType === "checkbox") {
                        this.checkboxes = question.options;
                    }
                    if(question.questionType === "radio") {
                        this.radios = question.options;                         
                    }
                    this.formField = {
                        label: question.name,
                        type: question.questionType,
                        id: question.id,
                        name: 'name',
                        placeholder: question.questionType,
                        checkboxFields: this.checkboxes,
                        radioFields: this.radios
                    }
                    this.formFields.push(this.formField);                                                            
                }
            });
        //console.log(this.form);
    }       



    addCheckbox(addCheckboxForm: NgForm) {                                 
        let values = addCheckboxForm.value;
        let selectedCategory = this.formFields.find(item => item.id === values.fieldId);
        if (selectedCategory.checkboxFields.some(x => x.label === values.name)) {
            alert('This checkbox already exists.');
            return;
        } else {
            selectedCategory.checkboxFields.push({
                label: values.name
            });            
        }
        this.counter++;
        this.addOption(values);

    }    

    addRadio(addRadioForm: NgForm) {                                
        let values = addRadioForm.value;
        let selectedCategory = this.formFields.find(item => item.id === values.fieldId);
        if (selectedCategory.radioFields.some(x => x.label === values.name)) {
            alert('This radio already exists.');
            return;
        } else {
            selectedCategory.radioFields.push({
                label: values.name,
                id: 'question' + this.counter,
                name: 'name'
            });            
        }         
        this.counter++;
        this.addOption(values);
    }

    addOption(values) {
        let selectedQuestion = this.questions.find(item => item.name === values.fieldLabel);
        let data = {        
            //id: null,
            //questionId: selectedQuestion.id,
            name: values.name,
            isAnswer: true                
        };
        let option = new Option(data);                         
        selectedQuestion.options.push(option);       
    }
                        
    addFormField(addFormFieldForm: NgForm) {                                 
        let values = addFormFieldForm.value;        
        if (this.formFields.some(x => x.label === values.name)) {
            alert('This question already exists.');
            return;
        }                 
        this.formFields.push({
            label: values.name,
            type: values.questionType,
            id: 'question' + this.counter,
            name: 'name',
            placeholder: values.questionType,
            checkboxFields: [],
            radioFields: []
        });
        this.counter++;
        this.addQuestion(values);
    }       

    deleteFormField(label) {
        let index: number = this.formFields.indexOf(this.formFields.find(x => x.label === label));
        this.formFields.splice(index, 1);
        this.deleteQuestion(label);             
    }

    addQuestion(values) {    
//        switch (values.questionType) {
//            case "text":
//                this.questionTypeId = 2;
//                this.questionTypeName = 'Text Field';
//                break;
//            case "radio":
//                this.questionTypeId = 3;
//                this.questionTypeName = 'Single Choice';
//                break;
//            case "checkbox":
//                this.questionTypeId = 1;
//                this.questionTypeName = 'Multiple Choice';
//                break;
//            default:
//                this.questionTypeId = 0;
//                this.questionTypeName = '';
//        }
        
        let data = {        
            //id: 1,
            name: values.name,
            questionType: values.questionType,
            options: [],
//            questionType: {
//                "id": this.questionTypeId,
//                "name": this.questionTypeName,
//                "isActive": true
//            }                   
        };
        let question = new Question(data);
        this.questions.push(question);        
                
    }

    deleteQuestion(label) {
        let index: number = this.questions.indexOf(this.questions.find(x => x.name === label));
        this.questions.splice(index, 1);              
    }

    submitMainForm(mainForm: NgForm) {
        let values = mainForm.value; 
        console.log(values);       
//        let data = {        
//            //id: id,
//            name: values.name,
//            description: values.description,
//            config: this.formConfig,
//            questions: this.questions                
//        };                        
//        let form = new Form(data);
//        //let serializedForm = JSON.stringify(form);
//        console.log(form);
//        
//        this.formService.createForm(form).subscribe(
//            data => {
//                this.alertService.success('form created.');
//                return true;
//            },
//            error => {
//                this.alertService.error("Error saving form! " + error);
//                return Observable.throw(error);
//            }
//        );

    }    

    goBack(): void {
        this.location.back();
    }    
                 
}

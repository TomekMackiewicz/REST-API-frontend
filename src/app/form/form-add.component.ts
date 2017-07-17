import { Component, OnInit } from '@angular/core';
//import { FormGroup, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';

import { Form } from './models/form';
import { FormConfig } from './models/form-config';
import { Question } from './models/question';
import { Option } from './models/option';

@Component({
    selector: 'form-add',
    templateUrl: './form-add.component.html',
    //animations: [slideInOutAnimation],
    //host: {'[@slideInOutAnimation]': ''}
})

export class FormAddComponent implements OnInit {

    private counter = 1;
    private questionTypeId: number = 0;
    private questionTypeName: string = '';
    private questions = [];
    private options = [];
    
    public types = [
        { value: 'text', display: 'Text', id: 2 },
        { value: 'radio', display: 'Radio', id: 3 },
        { value: 'checkbox', display: 'Checkbox', id: 1 }
    ];    

    public optionTypes = [
        { value: 'radio', display: 'Radio' },
        { value: 'checkbox', display: 'Checkbox' }
    ];    
                     
    private formFields = []; 
    //private optionsFields = [];
    private radioFields = []; // remove, after assign chb to form field
    private checkboxFields = []; //remove, after assign radio to form field

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
    
    // make object 
//    private options = [{
//        questionId: 1010,
//        name: "Exception",
//        isAnswer: false
//    }];

    ngOnInit() {}       

    addCheckbox(addCheckboxForm: NgForm) {                                 
        let values = addCheckboxForm.value;
        console.log(values);
        // Check if question already exists.
        if (this.checkboxFields.some(x => x.label === values.name)) {
            alert('This checkbox already exists.');
            return;
        }         
        
        this.checkboxFields.push({
            label: values.name,
            //type: values.optionType,
            //id: 'question' + this.counter, // radio
            //name: 'name', // radio
        });
        this.counter++;
        this.addOption(values);
        //console.log(this.checkboxFields);
    }    

    addRadio(addRadioForm: NgForm) {                                
        let values = addRadioForm.value;
        //console.log(values);
        // Check if question already exists.
        if (this.radioFields.some(x => x.label === values.name)) {
            alert('This option already exists.');
            return;
        }         
        
        this.radioFields.push({
            label: values.name,
            //type: values.optionType,
            id: 'question' + this.counter, // radio
            name: 'name', // radio
        });
        this.counter++;
        this.addOption(values);
        //console.log(this.radioFields);
    }

    addOption(values) {
        let data = {        
            id: null,
            questionId: 1,
            name: values.name,
            isAnswer: true                
        };
        let option = new Option(data);
        this.options.push(option);        
        //console.log(this.options);
        this.questions[0].options.push(option);
        console.log(this.questions);        
    }
                        
    addFormField(addFormFieldForm: NgForm) {       
                          
        let values = addFormFieldForm.value;
        
        // Check if question already exists.
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
            // tu dodać checkboxy, radio
        });
        this.counter++;
        this.addQuestion(values);
        //console.log(this.formFields);
    }       

    deleteFormField() {
        event.preventDefault();
        //questionPanel.remove();
        let index: number = this.formFields.indexOf(this.formFields.find(x => x.name === name));
        this.formFields.splice(index, 1);
        this.deleteQuestion();
        //console.log(this.formFields);        
        //return this.formFields;              
    }

    addQuestion(values) {
    
        switch (values.questionType) {
            case "text":
                this.questionTypeId = 2;
                this.questionTypeName = 'Text Field';
                break;
            case "radio":
                this.questionTypeId = 3;
                this.questionTypeName = 'Single Choice';
                break;
            case "checkbox":
                this.questionTypeId = 1;
                this.questionTypeName = 'Multiple Choice';
                break;
            case "email":
                this.questionTypeId = 4;
                this.questionTypeName = 'Email Field';
                break;
            default:
                this.questionTypeId = 0;
                this.questionTypeName = '';
        }
        
        let data = {        
            id: 1,
            name: values.name,
            questionTypeId: this.questionTypeId,
            options: [],
//            questionType: {
//                "id": this.questionTypeId,
//                "name": this.questionTypeName,
//                "isActive": true
//            }                   
        };
        let question = new Question(data);
        this.questions.push(question);        

        console.log(this.questions); 
                
    }

    deleteQuestion() {
        //questionPanel.remove();
        let index: number = this.questions.indexOf(this.questions.find(x => x.name === name));
        this.questions.splice(index, 1);
        //console.log(this.questions);        
        //return this.questions;              
    }

    submitMainForm(mainForm: NgForm) {
        let id = 1;
        let values = mainForm.value;
        
        let data = {        
            id: id,
            name: values.name,
            description: values.description,
            config: this.formConfig,
            questions: this.questions                
        };        
                
        let form = new Form(data);
        
        console.log(form);

        //let serializedForm = JSON.stringify(formObj);
//        this.http.post("www.domain.com/api", serializedForm)
//            .subscribe(
//                data => console.log("success!", data),
//                error => console.error("couldn't post because", error)
//            );
    }    
    
    // ?
    submitQuestionForm(questionForm: NgForm) {
        let questionFormValues = questionForm.value;

        console.log(questionFormValues);
    }
                
}

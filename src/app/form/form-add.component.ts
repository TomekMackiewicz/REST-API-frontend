import { Component, OnInit } from '@angular/core';
//import { FormGroup, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';

import { Form } from './models/form';
import { FormConfig } from './models/form-config';
import { Question } from './models/question';

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
    
    public types = [
        { value: 'text', display: 'Text', id: 2 },
        { value: 'radio', display: 'Radio', id: 3 },
        { value: 'checkbox', display: 'Checkbox', id: 1 },
        { value: 'email', display: 'Email', id: 4 }
    ];    
                 
    private formFields = [];  

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
    private options = [{
        questionId: 1010,
        name: "Exception",
        isAnswer: false
    }];

    ngOnInit() {}       
                
    addFormField(addFormFieldForm: NgForm) {       
                          
        let values = addFormFieldForm.value;
        
        // Check if question already exists.
        if (this.questions.some(x => x.name === values.name)) {
            alert('This question already exists.');
            return;
        }         
        
        this.formFields.push({
            label: values.name,
            type: values.questionType,
            id: 'question' + this.counter,
            name: 'name',
            placeholder: values.questionType,
        });
        this.counter++;
        this.addQuestion(values);
        console.log(this.formFields);
    }       

    deleteFormField() {
        event.preventDefault();
        //questionPanel.remove();
        let index: number = this.formFields.indexOf(this.formFields.find(x => x.name === name));
        this.formFields.splice(index, 1);
        this.deleteQuestion();
        console.log(this.formFields);        
        //return this.formFields;              
    }

    deleteQuestion() {
        //questionPanel.remove();
        let index: number = this.questions.indexOf(this.questions.find(x => x.name === name));
        this.questions.splice(index, 1);
        console.log(this.questions);        
        //return this.questions;              
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
//        this.questions.push({
//            name: values.name,
//            questionTypeId: this.questionTypeId,
//            options: [],
//            questionType: {
//                "id": this.questionTypeId,
//                "name": this.questionTypeName,
//                "isActive": true
//            }
//        });
        console.log(this.questions); 
                
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

    submitQuestionForm(questionForm: NgForm) {
        let questionFormValues = questionForm.value;

        console.log(questionFormValues);
    }
                
}

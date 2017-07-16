import { Component, OnInit } from '@angular/core';
//import { FormGroup, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';

@Component({
    selector: 'form-add',
    templateUrl: './form-add.component.html',
    //animations: [slideInOutAnimation],
    //host: {'[@slideInOutAnimation]': ''}
})

export class FormAddComponent implements OnInit {

    private counter = 1;
        
    private questions = [{
        type: 'text',
        class: 'form-control',
        id: 'question' + this.counter,
        name: 'question' + this.counter,
        placeholder: 'Question1'
    }];
    
    private questionsSet = [{"questions": this.questions}];
    
    //form: FormGroup;

    //constructor(private fbuilder: FormBuilder,
    //            private http: Http) { }

    ngOnInit(){
//        this.form = this.fbuilder.group({
//            name: '',
//            description: ''
//        });
    }    
        
    public addQuestion() {
        this.counter++;
        this.questions.push({
            type: 'text',
            class: 'form-control',
            id: 'question' + this.counter,
            name: 'question' + this.counter,
            placeholder: 'Question1'
        });
        //this.questions.push(this.question);
        //console.log(this.questionsSet);
    }
    
//    public submitForm() {
//        let formData = new FormData();
//        console.log(formData);
//    }        

    submitForm(form: NgForm) {
        
        //let formValues = JSON.stringify(form.value);
        let formName = form.value.name;
        let formDescription = form.value.description;
        let formQuestions = this.questionsSet;
        
        let output = JSON.stringify(formName + formDescription + formQuestions);
        
        console.log(output);
        //console.log(formValues);
        //let formObj = this.form.getRawValue(); // {name: '', description: ''}

        //let serializedForm = JSON.stringify(formObj);
        //console.log(formObj);
//        this.http.post("www.domain.com/api", serializedForm)
//            .subscribe(
//                data => console.log("success!", data),
//                error => console.error("couldn't post because", error)
//            );
    }    
            
}

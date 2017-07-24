import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//import { NgForm, FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { FormService } from './form.service';
import { FormHelperService } from '../services/form-helper.service';
import { Option, Question, Form, Answer } from './models/index';
import { AlertService } from '../alert/alert.service';

@Component({
    selector: 'app-form',
    templateUrl: './form-front.component.html',
    //styleUrls: ['./form.component.css'],
    providers: [ FormService ]
})

export class FormFrontComponent implements OnInit {
    
    form: Form = new Form(null);
    formId: number = 15;
    //outputForm: FormGroup;
    pager = {
        index: 0,
        size: 1,
        count: 1
    };
    answers = [];

    constructor(
        private formService: FormService,
        private alertService: AlertService
        //private fb: FormBuilder      
    ) { }
        
    ngOnInit() {      
        this.getForm(this.formId);
//        this.outputForm = this.fb.group({
//            checkbox: this.fb.array([])
//        });
    }  

//    onChange(checkbox:string, isChecked: boolean) {
//      const checkoboxFormArray = <FormArray>this.outputForm.controls.checkbox;
//
//      if(isChecked) {
//        checkoboxFormArray.push(new FormControl(checkbox));
//      } else {
//        let index = checkoboxFormArray.controls.findIndex(x => x.value == checkbox)
//        checkoboxFormArray.removeAt(index);
//      }
//      console.log(this.outputForm.value);
//    }   
            
    getForm(id: number) {
        this.formService.getForm(id).subscribe(
            data => {
                this.form = data,
                this.pager.count = this.form.questions.length
            },
            err => console.error(err),
            () => console.log('done loading form')
        );      
    }

//    get filteredQuestions() {
//        return (this.form.questions) ?
//        this.form.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
//    }
    
    onSelect(f: NgForm, label: number, index: number) {
        let data = {        
            answer: f.value,
            label: label                
        };
        let answer = new Answer(data);
        this.answers.push(answer);
        console.log(this.answers);

        if (this.form.config.autoMove) {
            this.goTo(this.pager.index + 1);
        } else {
            this.goTo(index);
        }
    }

    goTo(index: number) {
        if (index >= 0 && index < this.pager.count) {
            this.pager.index = index;
            //this.mode = 'form';
        }
    }

    submitForm(f: NgForm) {
        let values = f.value;
        console.log(values);
        //console.log(this.answers);
        this.alertService.success('Form successfull submitted.');
    }    
        
}

//export class FormFrontComponent implements OnInit {
//    forms: any[];
//    form: Form = new Form(null);
//    mode = 'form';
//    formId: number;
    //config: FormConfig;
//    config: FormConfig = {
//        'allowBack': true,
//        'allowReview': true,
//        'autoMove': false,  // if true, it will move to next question automatically when answered.
//        'duration': 0,  // indicates the time in which form needs to be completed. 0 means unlimited.
//        'pageSize': 1,
//        'requiredAll': false,  // indicates if you must answer all the questions before submitting.
//        'richText': false,
//        'shuffleQuestions': false,
//        'shuffleOptions': false,
//        'showClock': false,
//        'showPager': true,
//        'theme': 'none'
//    };

//    pager = {
//        index: 0,
//        size: 1,
//        count: 1
//    };

    //constructor(private formService: FormService) { }

//    ngOnInit() {
//        this.forms = this.formService.getAll();
//        this.formId = this.forms[0].id; //Object.keys(this.forms)[0];
//        this.loadForm(this.formId);
//        //this.config = 'aaaaaaaaaaaaaa';
//        //console.log('form config = '+this.config);
//    }

//    getForms() {
//        this.formService.getForms().subscribe(
//            data => {this.forms = data},
//            err => console.error(err),
//            () => console.log('done loading forms')
//        );
//    }

//    loadForm(formId: number) {
//        this.formService.getForm(formId).subscribe(res => {
//            this.form = new Form(res);
//            //this.config = this.form.config;
//            //console.log('form config');
//            this.pager.count = this.form.questions.length;
//        });
//        this.mode = 'form';
//        //console.log(this.form);
//    }
//
//    get filteredQuestions() {
//        //console.log('filtered question');
//        return (this.form.questions) ?
//        this.form.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
//    }

//    onSelect(question: Question, option: Option) {
//        if (question.questionType === 'checkbox') {
//            question.options.forEach((x) => { if (x.id !== option.id) x.selected = false; });
//        }
//
//        if (this.form.config.autoMove) {
//            this.goTo(this.pager.index + 1);
//        }
//    }
//
//    goTo(index: number) {
//        if (index >= 0 && index < this.pager.count) {
//            this.pager.index = index;
//            this.mode = 'form';
//        }
//    }
//
//    isAnswered(question: Question) {
//        return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
//    };
//
//    isCorrect(question: Question) {
//        return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
//    };
//
//    onSubmit() {
//        let answers = [];
//        this.form.questions.forEach(x => answers.push({ 'formId': this.form.id, 'questionId': x.id, 'answered': x.answered }));
//
//        // Post your data to the server here. answers contains the questionId and the users' answer.
//        console.log(answers);
//        this.mode = 'result';
//    }
//}

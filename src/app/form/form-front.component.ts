import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormService } from './form.service';
import { FormHelperService } from '../services/form-helper.service';
import { Option, Question, Form } from './models/index';
import { AlertService } from '../alert/alert.service';

@Component({
    selector: 'app-form',
    templateUrl: './form-front.component.html',
    //styleUrls: ['./form.component.css'],
    providers: [ FormService ]
})

export class FormFrontComponent implements OnInit {
    
    form: Form = new Form(null);
    pager = {
        index: 0,
        size: 1,
        count: 1
    };
    next: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private formService: FormService,
        private alertService: AlertService,
        private router: Router    
    ) {}
        
    ngOnInit() {      
        this.route.params
            .switchMap((params: Params) => this.formService.getForm(+params['id']))
            .subscribe(form => {
                this.form = form,
                this.pager.count = this.form.questions.length
            });
            console.log(this.pager.index);        
    }    

//    goToPrevious(index: number) {
//        if (index >= 0 && index < this.pager.count) {
//            this.pager.index = index;
//        }
//    }

    goTo(index: number, val: boolean, form: NgForm, qId: number) {
        //console.log(this.pager.index);
        if (index >= 0 && index < this.pager.count) {
            if(val) {
                this.validate(form.value[qId]);
            }
            if(this.next === true) {
                this.pager.index = index;
            }
        }
    }

    checkIndex() {
        console.log(this.pager.index);
        console.log(this.form);
    }

    validate(field: any) {
        if(field === "") {
            this.alertService.error("Question number " + (this.pager.index+1) + " is required.");
            this.next = false;
        } else {
            this.alertService.clear();
            this.next = true;
        }
    }

    submitForm(form: NgForm) {
        //if(form.valid)
        console.log(form);
//        let values = form.value; 
//        for(let value of values) {
//            if(value === null) {
//                this.alertService.error("Answer all questions.");
//                break;
//            }
//        }        
//        let values = form.value;     
//        this.formService.submitAnswers(values).subscribe(
//            data => {
//                this.alertService.success('Form successfull submitted.'); // po co tu alert skoro redirect?
//                let allow = true;
//                localStorage.setItem("allow", JSON.stringify(allow));
//                this.router.navigateByUrl('texts/preview/' + data.json());
//                return true;
//            },
//            error => {
//                this.alertService.error("Error saving form! " + error);
//                return Observable.throw(error);
//            }
//        );         
    }       
                  
}

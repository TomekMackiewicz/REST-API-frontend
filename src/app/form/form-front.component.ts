import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormService } from './form.service';
import { FormHelperService } from '../services/form-helper.service';
import { Option, Question, Form } from './model/index'; // option, question unused
import { AlertService } from '../alert/alert.service';
import { LoaderService } from '../services/loader.service';

@Component({
    selector: 'form-front',
    templateUrl: './form-front.component.html',
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
        private router: Router,
        private route: ActivatedRoute,
        private formService: FormService,
        private alertService: AlertService,
        private loaderService: LoaderService,
        private ref: ChangeDetectorRef    
    ) {}
        
    ngOnInit() {   
        this.loaderService.displayLoader(true);   
        this.route.params
            .switchMap((params: Params) => this.formService.getForm(+params['id']))
            .subscribe(
                data => {
                    this.loaderService.displayLoader(false);
                    this.form = data;
                    this.pager.count = this.form.questions.length;
                    this.ref.detectChanges();
                },
                error => {
                    this.loaderService.displayLoader(false);
                    this.alertService.error("Error loading form! " + error);
                    this.ref.detectChanges();
                    return Observable.throw(error);
                }                 
            );       
    }    

    goTo(index: number, val: boolean, form: NgForm, question: any) {
        if (index >= 0 && index < this.pager.count) {
            if(val) {
                this.validate(form.value[question.id], question);
            }
            if(this.next === true) {
                this.pager.index = index;
            }            
        }
    }

    validate(value: any, question: any) {
        switch(question.validation) { 
            case "email": {  
                var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
                if (!EMAIL_REGEXP.test(value)) {
                    this.alertService.error("Not valid email.");
                    this.next = false;
                    return;
                } else {
                    this.next = true;
                }                
                break; 
            } 
            case "code": { 
                var POSTAL_CODE_REGEXP = /[0-9]{2}-[0-9]{3}/; 
                if (!POSTAL_CODE_REGEXP.test(value)) {
                    this.alertService.error("Not valid postal code.");
                    this.next = false;
                    return;
                } else {
                    this.next = true;
                }                  
                break; 
            } 
            default: { 
                break; 
            } 
        }        
                
        if(question.required === true && value === "") {
            this.alertService.error("Question number " + (this.pager.index+1) + " is required.");
            this.next = false;
            return;
        } else {
            this.alertService.clear();
            this.next = true;
        }
    }

    submitForm(form: NgForm) {
        this.loaderService.displayLoader(true);       
        let values = form.value;  
        this.formService.submitAnswers(values).subscribe(
            data => {
                this.loaderService.displayLoader(false);
                localStorage.setItem("allow", JSON.stringify(true));
                this.router.navigateByUrl('texts/preview/' + data.json());
                this.ref.markForCheck();
            },
            error => {
                this.loaderService.displayLoader(false);
                this.alertService.error("Error saving form! " + error);
                this.ref.markForCheck();
                return Observable.throw(error);
            }
        );         
    }       
                  
}

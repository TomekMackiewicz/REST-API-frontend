import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
    formId: number = 5;
    pager = {
        index: 0,
        size: 1,
        count: 1
    };

    constructor(
        private formService: FormService,
        private alertService: AlertService     
    ) { }
        
    ngOnInit() {      
        this.getForm(this.formId);
    }    
            
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

    goTo(index: number) {
        if (index >= 0 && index < this.pager.count) {
            this.pager.index = index;
        }
    }

    submitForm(f: NgForm) {
        let values = f.value;
        console.log(values);
        this.alertService.success('Form successfull submitted.');
    }    
        
}

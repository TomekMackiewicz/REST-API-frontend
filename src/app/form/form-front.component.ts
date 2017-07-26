import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute, Params } from '@angular/router';
import { FormService } from './form.service';
import { FormHelperService } from '../services/form-helper.service';
import { Option, Question, Form } from './models/index';
import { AlertService } from '../alert/alert.service';
//import { TruncatePipe } from '../pipes/truncate.pipe';

@Component({
    selector: 'app-form',
    templateUrl: './form-front.component.html',
    //styleUrls: ['./form.component.css'],
    providers: [ FormService ]
})

export class FormFrontComponent implements OnInit {
    
    form: Form = new Form(null);
    text: string = '';
    pager = {
        index: 0,
        size: 1,
        count: 1
    };

    constructor(
        private route: ActivatedRoute,
        private formService: FormService,
        private alertService: AlertService     
    ) {}
        
    ngOnInit() {      
        this.route.params
            .switchMap((params: Params) => this.formService.getForm(+params['form']))
            .subscribe(form => {
                this.form = form,
                this.pager.count = this.form.questions.length
            });        
    }    

    goTo(index: number) {
        if (index >= 0 && index < this.pager.count) {
            this.pager.index = index;
        }
    }

    getText(id: number) {
        this.formService.getText(id).subscribe(
            data => {this.text = data},
            err => console.error(err)
        );        
    }

    submitForm(form: NgForm) {        
        let values = form.value; 
        //console.log(values);       
        this.formService.submitAnswers(values).subscribe(
            data => {
                this.alertService.success('Form successfull submitted.');
                this.getText(4);
                return true;
            },
            error => {
                this.alertService.error("Error saving form! " + error);
                return Observable.throw(error);
            }
        );         
    }       
            
}

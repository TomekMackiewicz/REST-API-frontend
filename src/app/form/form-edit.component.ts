import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Location } from '@angular/common';
import { Form, Question, Option } from './model/index';
import { FormService } from './form.service';
import { AlertService } from '../alert/alert.service';
import { LoaderService } from '../services/loader.service';
import { ComponentCanDeactivate } from '../guards/pending-changes.guard';
//import { slideInOutAnimation } from '../animations/index';

@Component({
    selector: 'form-edit',
    templateUrl: './form-edit.component.html',
    //animations: [slideInOutAnimation],
    //host: {'[@slideInOutAnimation]': ''}
})

export class FormEditComponent implements OnInit, ComponentCanDeactivate {

    private form: Form;
    private questions: Array<Question>;
    private options: Array<Option>; 
    private categories: any;    
    private types = [
        { value: 'text', display: 'Text' },
        { value: 'radio', display: 'Radio' },
        { value: 'checkbox', display: 'Checkbox' }
    ];
    private checked: boolean = true;
    private selectedType: string = "text";     
    private selectedOption: string = "none";
    private isOpen: boolean = false;
    private iterator: number;
    private change: boolean = false;
        
    constructor(
        private http: Http,
        private location: Location,
        private formService: FormService,
        private alertService: AlertService,
        private loaderService: LoaderService,
        private route: ActivatedRoute,
        private ref: ChangeDetectorRef        
    ) {}

    // @HostListener allows us to also guard against browser refresh, close, etc.
    @HostListener('window:beforeunload')
    canDeactivate(): Observable<boolean> | boolean {
        if(this.change !== false) {
            return false; 
        } else {
            return true;
        } 
    }

    ngOnInit(): void {
        this.loaderService.displayLoader(true);
        this.route.params
            .switchMap((params: Params) => this.formService.getForm(+params['id']))
            .subscribe(
                data => { 
                    this.loaderService.displayLoader(false);
                    this.form = data;
                    this.ref.detectChanges(); 
                },
                error => {
                    this.loaderService.displayLoader(false);
                    this.alertService.error("Error loading form! " + error);
                    this.ref.detectChanges();
                    return Observable.throw(error);
                }                  
            );
        this.getCategories();    
    }       

    getCategories() {
        this.formService.getCategories().subscribe(
            data => { 
                this.categories = data;
                this.ref.detectChanges(); 
            },
            error => {
                this.alertService.error("Error loading categories! " + error);
                return Observable.throw(error);
            }
        );
    }
    
    /**
     * Categories assigned to this form are checked on init
     */
    findCategories(categoryId: number) {
        let i: number = 0;
        while (i < this.form.categories.length) {
            if (categoryId === this.form.categories[i].id) {
                return true;
            }
            ++i;
        }
    }
    
    /**
     * Add new categories to the form
     */
    assignCategories(categoryId: number, categoryName: string, isChecked: boolean) {
        this.trackChanges(true);
        if (isChecked) {
            if (this.form.categories.some(x => x.id === categoryId)) {
                return;
            } else {
                this.form.categories.push({id: categoryId, name: categoryName});
            }
        } else {
            let index: number = this.form.categories.indexOf(this.form.categories.find(x => x.id === categoryId));
            this.form.categories.splice(index, 1);
        }
        
        return this.form.categories;
    }

    addQuestion(form: NgForm) {                   
        let question = new Question(form.value);
        this.form.questions.push(question);
        this.trackChanges(true);                                
    }
    
    deleteQuestion(id: number, name: string) {
        if (confirm("Are you sure you want to delete " + name + "?")) {        
            let index: number = this.form.questions.indexOf(this.form.questions.find(x => x.name === name));
            this.form.questions.splice(index, 1);
            if(typeof id !== 'undefined') {
                this.formService.deleteQuestion(id).subscribe(
                    data => {
                        return true;
                    },
                    error => {
                        this.alertService.error("Error deleting question! " + error);
                        return Observable.throw(error);
                    }
                );                           
            }
            this.trackChanges(true);
        }                        
    }      
        
    addOption(question: Question, name: string) {
        let option = new Option({name: name, questionId: question.id});                        
        question.options.push(option); 
        this.trackChanges(true);      
    }

    deleteOption(question: any, id: number, name: string) {
        if (confirm("Are you sure you want to delete " + name + "?")) {        
            let index: number = question.options.indexOf(question.options.find(x => x.name === name));
            question.options.splice(index, 1);
            if(typeof id !== 'undefined') {
                this.formService.deleteOption(id).subscribe(
                    data => {
                        return true;
                    },
                    error => {
                        this.alertService.error("Error deleting option! " + error);
                        return Observable.throw(error);
                    }
                );                           
            }
            this.trackChanges(true);
        }                          
    }

    saveForm() {
        let i = 0;
        for (let question of this.form.questions) {
            i++;
            question.sequence = i;
        }
        if(this.form.name !== "") {
            this.trackChanges(false); 
            this.loaderService.displayLoader(true);             
            this.formService.updateForm(this.form).subscribe(
                data => {
                    this.loaderService.displayLoader(false);
                    this.alertService.success('form updated.');
                    this.ref.markForCheck();
                },
                error => {
                    this.loaderService.displayLoader(false);
                    this.alertService.error("Error updating form! " + error);
                    this.ref.markForCheck();
                    return Observable.throw(error);
                }
            );            
        } else {
            this.alertService.error("Form name is required.");
        }
    }    

    trackChanges(change: boolean) {
        this.change = change;
    }

    goBack(): void {   
        this.location.back();    
    }

    onTypeSelect(selectedType: string) {
        this.selectedType = selectedType;
        this.trackChanges(true);
    }    

    toogleOpen(iterator: number) {
        this.isOpen = !this.isOpen;
        this.iterator = iterator;
    }
                         
}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { SettingsForm } from './model/settingsForm';
import { AlertService } from '../alert/alert.service';
import { LoaderService } from '../services/loader.service';
import { SettingsService } from './settings.service';

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html'
})

export class SettingsComponent implements OnInit {

    public settingsForm: FormGroup;
    public settings: any;
    
    constructor(
        private ref: ChangeDetectorRef,            
        private fb: FormBuilder,
        private settingsService: SettingsService,
        private alertService: AlertService,
        private loaderService: LoaderService        
    ) {}
    
    ngOnInit() {
        //this.getSettings();
        this.settingsForm = this.fb.group({
            settings: this.fb.group({
                price: ['']
            })                         
        });           
                
    }

//    getSettings() {
//        this.loaderService.displayLoader(true);
//        this.settingsService.getSettings(1).subscribe(
//            data => {
//                this.settings = data;
//                this.loaderService.displayLoader(false);
//                this.ref.detectChanges();
//            },
//            error => {
//                this.alertService.error("Error loading settings! " + error);
//                this.loaderService.displayLoader(false);
//                this.ref.detectChanges();
//                return Observable.throw(error);
//            }
//        );
//    }

    updateSettings(model: SettingsForm, isValid: boolean) {
        console.log(model);
//        if(isValid === true) { 
//            this.loaderService.displayLoader(true);
//            this.settingsService.updateSettings(model).subscribe(
//                data => {
//                    this.loaderService.displayLoader(false);
//                    this.alertService.success('Settings updated.');
//                    this.ref.markForCheck();                   
//                },
//                error => {
//                    this.loaderService.displayLoader(false);
//                    this.alertService.error("Error during updating settings! " + error);
//                    this.ref.markForCheck();
//                    return Observable.throw(error);
//                }
//            );         
//        }         
    }
        
}

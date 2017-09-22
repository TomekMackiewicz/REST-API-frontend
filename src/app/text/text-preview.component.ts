import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TextService } from './text.service';
import { AlertService } from '../alert/alert.service';
import { LoaderService } from '../services/loader.service';
import { SettingsService } from '../settings/settings.service';
import { PaymentForm } from './model/paymentForm';
import { Text } from './model/text';

@Component({
    selector: 'text-preview',
    templateUrl: './text-preview.component.html',
    providers: [ TextService, SettingsService ]
})

export class TextPreviewComponent implements OnInit {

    private text: Text;
    private settings: any;
    private paymentForm: FormGroup;
    private submitted: boolean;
    private events: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private textService: TextService,
        private alertService: AlertService,
        private loaderService: LoaderService,
        private settingsService: SettingsService,
        private ref: ChangeDetectorRef,
        private fb: FormBuilder
    ) {}
        
    ngOnInit() {
        this.loaderService.displayLoader(true);   
        this.getSettings();   
        this.route.params
            .switchMap((params: Params) => this.textService.getTextByID(+params['id']))
            .subscribe(
                data => { 
                    this.text = new Text(data);
                    this.prepareForm(this.text, this.settings);
                    this.ref.detectChanges();
                    this.loaderService.displayLoader(false); 
                },
                error => {
                    this.alertService.error("Error loading document! " + error);
                    this.loaderService.displayLoader(false);
                    this.ref.detectChanges(); // czy potrzebne?
                }
            );                               
    }    

    getSettings() {
        this.settingsService.getSettings(1).subscribe(
            data => {
                this.settings = data;
            },
            error => {
                this.alertService.error("Error loading settings! " + error);
            }
        );
    }

    prepareForm(text: Text, settings: any) {
        this.paymentForm = this.fb.group({
            totalAmount: settings.price,
            id: text.id,
            buyer: this.fb.group({
                email: ['', [<any>Validators.required, <any>Validators.email]],
                phone: ['', [<any>Validators.required, <any>Validators.minLength(9)]],
                firstName: ['', [<any>Validators.required]],
                lastName: ['', [<any>Validators.required]],
                language: ['pl']                
            }),
            settings: this.fb.group({
                invoiceDisabled: ['']
            }),
            products: this.fb.array([
                this.fb.group({
                    name: text.title,
                    unitPrice: settings.price,
                    quantity: ["1"]
                })
            ])                         
        });         
    }

    transaction(model: PaymentForm, isValid: boolean) {
        if(isValid === true) { 
            this.loaderService.displayLoader(true);
            this.textService.processTransaction(model).subscribe(
                data => {
                    this.loaderService.displayLoader(false);
                    this.ref.markForCheck();
                    window.open(data, '_blank');                    
                },
                error => {
                    this.loaderService.displayLoader(false);
                    this.alertService.error("Error during processing! " + error);
                    this.ref.markForCheck();
                }
            );         
        }         
    }
                         
}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { TextService } from './text.service';
import { AlertService } from '../alert/alert.service';
import { LoaderService } from '../services/loader.service';
import { saveAs } from 'file-saver';

//import { Payment } from './models/payment';
//import { Buyer } from './models/buyer';
//import { Product } from './models/product';

import { PaymentForm } from './models/paymentForm';

@Component({
    selector: 'text-preview',
    templateUrl: './text-preview.component.html',
    providers: [ TextService ]
})

export class TextPreviewComponent implements OnInit {

    text: any;

    public paymentForm: FormGroup;
    public submitted: boolean;
    public events: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private textService: TextService,
        private alertService: AlertService,
        private loaderService: LoaderService,
        private ref: ChangeDetectorRef,
        private fb: FormBuilder
    ) {}
        
    ngOnInit() {
        this.loaderService.displayLoader(true);      
        this.route.params
            .switchMap((params: Params) => this.textService.getTextByID(+params['id']))
            .subscribe(
                data => { 
                    this.loaderService.displayLoader(false);
                    this.text = data;
                    this.prepareForm(this.text.id);
                    this.ref.detectChanges(); 
                },
                error => {
                    this.alertService.error("Error loading document! " + error);
                    this.loaderService.displayLoader(false);
                    this.ref.detectChanges(); // czy potrzebne?
                }
            );
            
//        this.paymentForm = this.fb.group({
//            //totalAmount: ["10000"], // potem zmienna w configu
//            id: this.fb.group({
//                id: ['']
//            }),
//            buyer: this.fb.group({
//                email: ['', [<any>Validators.required, <any>Validators.email]],
//                phone: ['', [<any>Validators.required, <any>Validators.minLength(9)]],
//                firstName: ['', [<any>Validators.required]],
//                lastName: ['', [<any>Validators.required]],
//                //language: ['pl']                
//            }),
////            settings: this.fb.group({
////                invoiceDisabled: ['']
////            }),
////            products: this.fb.group({
////                name: ['legalForm'],
////                unitPrice: ["10000"],
////                quantity: ["1"]
////            })
//            products: this.fb.array([
//                this.fb.group({
//                    name: ['legalForm'],
//                    unitPrice: ["10000"],
//                    quantity: ["1"]
//                })
//            ])                         
//        });            
                
    }    

    prepareForm(id) {
        this.paymentForm = this.fb.group({
            //totalAmount: ["10000"], // potem zmienna w configu
            id: id,
            buyer: this.fb.group({
                email: ['', [<any>Validators.required, <any>Validators.email]],
                phone: ['', [<any>Validators.required, <any>Validators.minLength(9)]],
                firstName: ['', [<any>Validators.required]],
                lastName: ['', [<any>Validators.required]],
                //language: ['pl']                
            }),
//            settings: this.fb.group({
//                invoiceDisabled: ['']
//            }),
//            products: this.fb.group({
//                name: ['legalForm'],
//                unitPrice: ["10000"],
//                quantity: ["1"]
//            })
            products: this.fb.array([
                this.fb.group({
                    name: ['legalForm'],
                    unitPrice: ["10000"],
                    quantity: ["1"]
                })
            ])                         
        });         
    }

    transaction(model: PaymentForm, isValid: boolean) {
        //this.submitted = true; // set form submit to true
        if(isValid === true) { 
            this.loaderService.displayLoader(true);
            this.textService.processTransaction(model).subscribe(
                data => {
                    this.loaderService.displayLoader(false);
                    //this.alertService.success('Payment processed.'); // ?
                    this.ref.markForCheck();
                    window.open(data, '_blank');                    
                },
                error => {
                    this.loaderService.displayLoader(false);
                    this.alertService.error("Error during processing! " + error);
                    this.ref.markForCheck();
                    //return Observable.throw(error);
                }
            );         
        }         
    }
                         
}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TextService } from './text.service';
import { AlertService } from '../alert/alert.service';
import { LoaderService } from '../services/loader.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'text-preview',
    templateUrl: './text-preview.component.html',
    providers: [ TextService ]
})

export class TextPreviewComponent implements OnInit {

    text: any;
    //showToken: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private textService: TextService,
        private alertService: AlertService,
        private loaderService: LoaderService,
        private ref: ChangeDetectorRef   
    ) {}
        
    ngOnInit() {
        this.loaderService.displayLoader(true);      
        this.route.params
            .switchMap((params: Params) => this.textService.getTextByID(+params['id']))
            .subscribe(
                data => { 
                    this.loaderService.displayLoader(false);
                    this.text = data;
                    this.ref.detectChanges(); 
                },
                error => {
                    this.alertService.error("Error loading document! " + error);
                    this.loaderService.displayLoader(false);
                    this.ref.detectChanges(); // czy potrzebne?
                }                 
            );       
    }    

    saveText() {
        //this.showToken = true;
        //let blob = new Blob([this.text.body], {type: "text/plain;charset=utf-8"}); //type: 'application/pdf' 
        //saveAs(blob, this.text.title+".txt");
        this.router.navigateByUrl('texts/full/'+this.text.token);        
    }     

    processTransaction() {
        let body = {
            "notifyUrl": "https://your.eshop.com/notify",
            "customerIp": "127.0.0.1",
            "merchantPosId": "300746",
            "description": "RTV market",
            "currencyCode": "PLN",
            "totalAmount": "21000",
            "buyer": {
                "email": "john.doe@example.com",
                "phone": "654111654",
                "firstName": "John",
                "lastName": "Doe",
                "language": "pl"
            },
            "settings": {
                "invoiceDisabled": "true"
            },
            "products": [
                {
                    "name": "Wireless Mouse for Laptop",
                    "unitPrice": "15000",
                    "quantity": "1"
                },
                {
                    "name": "HDMI cable",
                    "unitPrice": "6000",
                    "quantity": "1"
                }
            ]
        };
        this.textService.processTransaction(body).subscribe(
            data => {
                //this.alertService.success('Document created.');
                return true;
            },
            error => {
                this.alertService.error("Error during processing! " + error);
 
            }
        );
    }    
                      
}


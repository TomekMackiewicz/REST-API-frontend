import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Rx';
import {DocumentService} from './document.service';
//import {SafeHtmlPipe} from '../pipes/safe.html.pipe';
//import {TruncatePipe} from '../pipes/truncate.pipe';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {saveAs as importedSaveAs} from "file-saver";

@Component({
    selector: 'app-front-document',
    templateUrl: './document-front.component.html'
})

export class DocumentFrontComponent implements OnInit {

    public document: any;

    constructor(
        private documentService: DocumentService,
        private route: ActivatedRoute,
        private location: Location,
        private http: Http
    ) {}

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.documentService.getDocument(+params['document']))
            .subscribe(category => this.document = category);
    }

    downloadFile(id: number, title: string) {
        this.documentService.downloadFile(id).subscribe(blob => {
            importedSaveAs(blob, title);
            }
        )
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
        this.documentService.processTransaction(body).subscribe(
            data => {
                //this.alertService.success('Document created.');
                return true;
            },
            error => {
                //this.alertService.error("Error saving document! " + error);
                return Observable.throw(error);
            }
        );
    }

}

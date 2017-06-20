import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Rx';
import {DocumentService} from './document.service';
import {SafeHtmlPipe} from '../pipes/safe.html.pipe';
import {TruncatePipe} from '../pipes/truncate.pipe';
import {Http, Response, Headers, RequestOptions} from "@angular/http";

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
    
    processTransaction() {
        //window.location.href='http://www.cnn.com/';
//        let headers = new Headers({
//            'Content-Type': 'application/json',
//            'Authorization': 'Bearer d9a4536e-62ba-4f60-8017-6053211d3f47'
//        });
//        let body = {
//            continueUrl: 'http://localhost:4200/documents',
//            currencyCode: 'PLN',
//            customerIp: '127.0.0.1',
//            description: 'Document',
//            merchantPosId: '300746',
//            notifyUrl: 'http://localhost:8000/transaction/notify',
//            product: 'Dokument',
//            totalAmount: '1000',
//            'OpenPayu-Signature': 'sender=145227;algorithm=SHA-256;signature=bc94a8026d6032b5e216be112a5fb7544e66e23e68d44b4283ff495bdb3983a8'};
//            
//        console.log(body, headers);
//
//        return this.http.post('https://secure.snd.payu.com/api/v2_1/orders', body, headers);        
                
       
    }

}


//<form ngNoForm id="payu-payment-form" method="post" action="https://secure.snd.payu.com/api/v2_1/orders">
//                <input type="hidden" name="continueUrl" value="http://localhost:4200/documents/">
//                <input type="hidden" name="currencyCode" value="PLN">
//                <input type="hidden" name="customerIp" value="127.0.0.1">
//                <input type="hidden" name="description" value="Order description">
//                <input type="hidden" name="merchantPosId" value="300746">
//                <input type="hidden" name="notifyUrl" value="http://localhost:8000/transaction/notify">
//                <input type="hidden" name="products[0].name" value="Dokument">
//                <input type="hidden" name="products[0].quantity" value="1">
//                <input type="hidden" name="products[0].unitPrice" value="1000">
//                <input type="hidden" name="totalAmount" value="1000">
//                <input type="hidden" name="OpenPayu-Signature" value="sender=145227;algorithm=SHA-256;signature=bc94a8026d6032b5e216be112a5fb7544e66e23e68d44b4283ff495bdb3983a8">
//                <button type="submit" formtarget="_blank"></button>
//            </form>
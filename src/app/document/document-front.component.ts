import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Rx';
import {DocumentService} from './document.service';
//import {SafeHtmlPipe} from '../pipes/safe.html.pipe';
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

    //    processTransaction() {
    //        let orderNo = 1;
    //        let headers = new Headers({
    //            'Content-Type': 'application/json',
    //            'Authorization': 'Bearer d9a4536e-62ba-4f60-8017-6053211d3f47'
    //        });
    //        let order = {
    //            continueUrl: 'http://localhost:8000/payu/success/1234',
    //            currencyCode: 'PLN',
    //            customerIp: '127.0.0.1',
    //            description: 'Document',
    //            merchantPosId: '300746',
    //            notifyUrl: 'http://localhost:8000/payu/notify',
    //            product: 'Dokument',
    //            totalAmount: '1000',
    //            'OpenPayu-Signature': 'sender=145227;algorithm=SHA-256;signature=bc94a8026d6032b5e216be112a5fb7544e66e23e68d44b4283ff495bdb3983a8'
    //        };
    //        this.documentService.processTransaction(order).subscribe(
    //            data => {
    //                //this.alertService.success('Document created.');
    //                return true;
    //            },
    //            error => {
    //                //this.alertService.error("Error saving document! " + error);
    //                return Observable.throw(error);
    //            }
    //        );
    //    }

    //    processTransaction() {
    //        //window.location.href='http://www.cnn.com/';
    //        let orderNo = 1;
    //        let headers = new Headers({
    //            'Content-Type': 'application/json',
    //            'Authorization': 'Bearer d9a4536e-62ba-4f60-8017-6053211d3f47'
    //        });
    //        let body = {
    //            continueUrl: 'http://localhost:8000/payu/success/1234',
    //            currencyCode: 'PLN',
    //            customerIp: '127.0.0.1',
    //            description: 'Document',
    //            merchantPosId: '300746',
    //            notifyUrl: 'http://localhost:8000/payu/notify',
    //            product: 'Dokument',
    //            totalAmount: '1000',
    //            'OpenPayu-Signature': 'sender=145227;algorithm=SHA-256;signature=bc94a8026d6032b5e216be112a5fb7544e66e23e68d44b4283ff495bdb3983a8'
    //        };
    //        console.log(headers);
    //        return this.http.post('http://localhost:8000/order/pay' + orderNo, body);
    //        //return this.http.post('https://secure.snd.payu.com/api/v2_1/orders', body, headers);
    //
    //
    //    }

}

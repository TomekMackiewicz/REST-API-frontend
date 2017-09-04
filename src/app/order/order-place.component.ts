import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Order } from './models/order';
import { OrderService } from './order.service';
import { AlertService } from '../alert/alert.service';
import { LoaderService } from '../services/loader.service';

@Component({
  templateUrl: './order-place.component.html'
})

export class OrderPlaceComponent {
    
    public amount: number;
    public show: Object;

    constructor(
        private router: Router,
        private orderService: OrderService,
        private alertService: AlertService,
        private loaderService: LoaderService,
        private route: ActivatedRoute,
        private location: Location,
        private ref: ChangeDetectorRef
    ) {}

    placeOrder(amount: any) {
        let order = new Order({amount: amount});
        this.loaderService.displayLoader(true);
        this.orderService.createOrder(order).subscribe(
            data => {
                this.loaderService.displayLoader(false);
                this.alertService.success('Order placed.');
                this.ref.markForCheck();
                this.showOrder(data.json());
            },
            error => {
                this.loaderService.displayLoader(false);
                this.alertService.error("Error saving order! " + error);
                this.ref.markForCheck();
                return Observable.throw(error);
            }
        );
    }        

    showOrder(id: number) {
        this.loaderService.displayLoader(true);
        this.orderService.showOrder(id).subscribe(
            data => {
                this.loaderService.displayLoader(false);
                this.show = data;
                console.log(this.show);
                this.alertService.success('Order placed.');
                this.ref.markForCheck();
            },
            error => {
                this.loaderService.displayLoader(false);
                this.alertService.error("Error saving order! " + error);
                this.ref.markForCheck();
                return Observable.throw(error);
            }
        );
    }
                    
}

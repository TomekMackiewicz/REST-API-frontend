import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Rx';
import { Order } from './models/order';
import { OrderService } from './order.service';
import { AlertService } from '../alert/alert.service';
import { LoaderService } from '../services/loader.service';

@Component({
  templateUrl: './order-place.component.html'
})

export class OrderPlaceComponent {
    
    public amount: number;

    constructor(
        private orderService: OrderService,
        private alertService: AlertService,
        private loaderService: LoaderService,
        private route: ActivatedRoute,
        private location: Location,
        private ref: ChangeDetectorRef
    ) {}

    placeOrder(amount: any) {
        let order = new Order({amount: amount});
        console.log(order);
        this.loaderService.displayLoader(true);
        this.orderService.createOrder(order).subscribe(
            data => {
                this.loaderService.displayLoader(false);
                this.alertService.success('Category created.');
                this.ref.markForCheck();
            },
            error => {
                this.loaderService.displayLoader(false);
                this.alertService.error("Error saving category! " + error);
                this.ref.markForCheck();
                return Observable.throw(error);
            }
        );
    }        
                
}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { OrderService } from './order.service';
import { LoaderService } from '../services/loader.service';
import { AlertService } from '../alert/alert.service';
//import { Order } from './models/order';

@Component({
  templateUrl: './order-list.component.html'
})

export class OrderListComponent implements OnInit {
    
    public orders: Array<Object>;

    constructor(
        private orderService: OrderService,
        private loaderService: LoaderService,
        private alertService: AlertService,
        private ref: ChangeDetectorRef
    ) {}    
        
    ngOnInit() {
        this.getOrders();
    }    

    getOrders() {
        this.loaderService.displayLoader(true);
        this.orderService.getOrders().subscribe(
            data => {
                this.orders = data;
                this.loaderService.displayLoader(false);
                this.ref.detectChanges();
            },
            error => {
                this.alertService.error("Error loading orders! " + error);
                this.loaderService.displayLoader(false);
                this.ref.detectChanges();
                return Observable.throw(error);
            }
        );
    }    
        
}

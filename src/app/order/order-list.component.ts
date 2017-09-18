import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { OrderService } from './order.service';
import { AlertService } from '../alert/alert.service';
import { LoaderService } from '../services/loader.service';
import { CurrencyPipe } from '@angular/common';
import { Order } from './model/order';

@Component({
    selector: 'order-list',
    templateUrl: './order-list.component.html',
    providers: [ OrderService ]
})

export class OrderListComponent implements OnInit {

    orders: Array<Order>;
    filter: string;
    query: string;

    constructor(
        private orderService: OrderService,
        private alertService: AlertService,
        private loaderService: LoaderService,
        private ref: ChangeDetectorRef        
    ) {}
        
    ngOnInit() {      
        this.getOrders();                  
    }    

    getOrders() {
        this.loaderService.displayLoader(true);
        this.orderService.getOrders().subscribe(
            data => {
                this.loaderService.displayLoader(false);
                this.orders = data;
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

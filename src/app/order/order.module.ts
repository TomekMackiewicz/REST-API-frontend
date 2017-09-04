import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // ?
import { FormsModule } from '@angular/forms'; // ?
import { DataTableModule } from "angular2-datatable";
import { AlertModule } from '../alert/alert';
import { OrderService } from './order.service';
import { OrderRoutingModule } from './order.routing';
import { OrderListComponent } from './order-list.component';
import { OrderPlaceComponent } from './order-place.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        OrderRoutingModule,
        DataTableModule,
        AlertModule
    ],
    declarations: [
        OrderListComponent,
        OrderPlaceComponent
    ],
    providers: [
        OrderService
    ]
})
export class OrderModule {}


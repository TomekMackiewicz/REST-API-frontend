import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // ?
import { BrowserModule } from '@angular/platform-browser'; // ?
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderRoutingModule } from './order-routing.module';
import { DataTableModule } from "angular2-datatable";
import { OrderListComponent } from './order-list.component';
import { SearchPipe } from '../pipes/search.pipe';
import { AlertModule } from '../alert/alert';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        OrderRoutingModule,
        AlertModule,
        FormsModule,
        ReactiveFormsModule,
        DataTableModule
    ],
    declarations: [
        OrderListComponent,
        SearchPipe
    ],
    providers: [ ]
})
export class OrderModule {}

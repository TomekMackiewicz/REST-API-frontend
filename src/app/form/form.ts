import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // ?
import { BrowserModule } from '@angular/platform-browser'; // ?
import { HttpModule } from '@angular/http'; // ?
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';
import { DataTableModule } from "angular2-datatable";
import { FormFrontComponent } from './form-front.component';
import { FormAddComponent } from './form-add.component';
import { FormListComponent } from './form-list.component';
import { FormEditComponent } from './form-edit.component';
import { FormRoutingModule } from './form-routing.module';
import { AlertModule } from '../alert/alert';
import { FormService } from './form.service';
//import { TruncatePipe } from '../pipes/truncate.pipe';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        HttpModule,
        FormsModule,
        FormRoutingModule,
        AlertModule,
        DataTableModule
    ],
    declarations: [
        FormFrontComponent,
        FormAddComponent,
        FormListComponent,
        FormEditComponent
    ],
    providers: [
        FormService
    ],
    //bootstrap: [ FormFrontComponent ]
})
export class FormModule {}


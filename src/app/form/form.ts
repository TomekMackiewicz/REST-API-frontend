import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // ?
import { BrowserModule } from '@angular/platform-browser'; // ?
import { HttpModule } from '@angular/http'; // ?
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';
import { FormFrontComponent } from './form-front.component';
import { FormAddComponent } from './form-add.component';
import { FormRoutingModule } from './form-routing.module';
import { AlertModule } from '../alert/alert';
import { FormService } from './form.service';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        HttpModule,
        FormsModule,
        FormRoutingModule,
        AlertModule
    ],
    declarations: [
        FormFrontComponent,
        FormAddComponent
    ],
    providers: [
        FormService
    ],
    //bootstrap: [ FormFrontComponent ]
})
export class FormModule {}


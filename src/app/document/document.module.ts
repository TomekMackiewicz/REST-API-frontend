import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DataTableModule} from "angular2-datatable";
import {AlertModule} from '../alert/alert';
import {TinyEditorModule} from '../tiny-editor/tiny-editor';

import {DocumentComponent} from './document.component';
import {DocumentEditComponent} from './document-edit.component';
import {DocumentCreateComponent} from './document-create.component';

import {DocumentService} from './document.service';

import {DocumentRoutingModule} from './document-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DocumentRoutingModule,
        DataTableModule,
        AlertModule,
        TinyEditorModule
    ],
    declarations: [
        //AlertComponent,
        DocumentComponent,
        DocumentEditComponent,
        DocumentCreateComponent
    ],
    providers: [
        DocumentService
    ]
})
export class DocumentModule {}
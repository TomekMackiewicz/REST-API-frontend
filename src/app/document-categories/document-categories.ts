import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common'; // ?
import {FormsModule} from '@angular/forms'; // ?
import {DataTableModule} from "angular2-datatable";
import {AlertModule} from '../alert/alert';

import {DocumentCategoriesComponent} from './document-categories.component';
import {DocumentCategoriesEditComponent} from './document-categories-edit.component';
import {DocumentCategoriesCreateComponent} from './document-categories-create.component';
import {DocumentCategoriesFrontComponent} from './document-categories-front.component';

import {DocumentCategoriesService} from './document-categories.service';

import {DocumentCategoriesRoutingModule} from './document-categories-routing';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DocumentCategoriesRoutingModule,
        DataTableModule,
        AlertModule
    ],
    declarations: [
        DocumentCategoriesComponent,
        DocumentCategoriesEditComponent,
        DocumentCategoriesCreateComponent,
        DocumentCategoriesFrontComponent
    ],
    providers: [
        DocumentCategoriesService
    ]
})
export class DocumentCategoriesModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // ?
import { FormsModule } from '@angular/forms'; // ?
import { DataTableModule } from "angular2-datatable";
import { AlertModule } from '../alert/alert.module';
import { CategoriesListComponent } from './categories-list.component';
import { CategoriesEditComponent } from './categories-edit.component';
import { CategoriesCreateComponent } from './categories-create.component';
import { CategoriesFrontComponent } from './categories-front.component';
import { CategoriesService } from './categories.service';
import { CategoriesRoutingModule } from './categories-routing';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CategoriesRoutingModule,
        DataTableModule,
        AlertModule
    ],
    declarations: [
        CategoriesListComponent,
        CategoriesEditComponent,
        CategoriesCreateComponent,
        CategoriesFrontComponent
    ],
    providers: [
        CategoriesService
    ]
})
export class CategoriesModule {}

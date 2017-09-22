import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from "angular2-datatable";
import { AlertModule } from '../alert/alert.module';
import { TinyEditorModule } from '../tiny-editor/tiny-editor';
import { DocumentListComponent } from './document-list.component';
import { DocumentEditComponent } from './document-edit.component';
import { DocumentCreateComponent } from './document-create.component';
import { DocumentService } from './document.service';
import { DocumentRoutingModule } from './document-routing.module';
import { PendingChangesGuard } from '../guards/pending-changes.guard';

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
        DocumentListComponent,
        DocumentEditComponent,
        DocumentCreateComponent
    ],
    providers: [
        DocumentService,
        PendingChangesGuard
    ]
})
export class DocumentModule {}

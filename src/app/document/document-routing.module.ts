import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { PendingChangesGuard } from '../guards/pending-changes.guard';
import { DocumentListComponent } from './document-list.component';
import { DocumentEditComponent } from './document-edit.component';
import { DocumentCreateComponent } from './document-create.component';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';

const documentRoutes: Routes = [
    { path: 'admin', 
        children: [
            { 
                path: 'documents/edit/:id', 
                component: DocumentEditComponent,
                canDeactivate: [PendingChangesGuard] 
            },
            { 
                path: 'documents/create', 
                component: DocumentCreateComponent,
                canDeactivate: [PendingChangesGuard] 
            },
            { 
                path: 'documents', 
                component: DocumentListComponent,
                data: { 
                    animation: { value: 'document-list' }
                }                  
            },
        ],
        canActivate: [ AuthGuard ] 
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(documentRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class DocumentRoutingModule {}

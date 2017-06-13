import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../guards/auth.guard';

import {DocumentEditComponent} from './document-edit.component';
import {DocumentCreateComponent} from './document-create.component';
import {DocumentComponent} from './document.component';

const documentRoutes: Routes = [
    {
        path: 'admin', children: [
            {path: 'documents/:id', component: DocumentEditComponent},
            {path: 'document/create', component: DocumentCreateComponent},
            {path: 'documents', component: DocumentComponent},
        ], canActivate: [AuthGuard]
    },
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

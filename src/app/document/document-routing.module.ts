import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../guards/auth.guard';

import {DocumentComponent} from './document.component';
import {DocumentEditComponent} from './document-edit.component';
import {DocumentCreateComponent} from './document-create.component';
import {DocumentFrontComponent} from './document-front.component';
import {MenuComponent} from '../menu/menu.component';
import {FooterComponent} from '../footer/footer.component';

const documentRoutes: Routes = [
    {
        path: 'admin', children: [
            {path: 'documents/:id', component: DocumentEditComponent},
            {path: 'document/create', component: DocumentCreateComponent},
            {path: 'documents', component: DocumentComponent},
        ], canActivate: [AuthGuard]
    },
    {
        path: 'documents/:document', children: [
            {path: '' , component: DocumentFrontComponent},
            {path: '' , component: MenuComponent, outlet: 'header'},
            {path: '' , component: FooterComponent, outlet: 'footer'}        
    ]}
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

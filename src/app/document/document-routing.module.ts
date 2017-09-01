import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../guards/auth.guard';

import {DocumentListComponent} from './document-list.component';
import {DocumentEditComponent} from './document-edit.component';
import {DocumentCreateComponent} from './document-create.component';
//import {DocumentFrontComponent} from './document-front.component';
import {MenuComponent} from '../menu/menu.component';
import {FooterComponent} from '../footer/footer.component';

const documentRoutes: Routes = [
    {path: 'admin', 
        children: [
            {path: 'documents/:id', component: DocumentEditComponent},
            {path: 'document/create', component: DocumentCreateComponent},
            {path: 'documents', component: DocumentListComponent},
        ], 
        data: {
            animation: {
                value: 'doc-admin',
            }
        },
        canActivate: [AuthGuard] 
    },
//    {path: 'documents/:document', 
//        children: [
//            {path: '' , component: DocumentFrontComponent},
//            {path: '' , component: MenuComponent, outlet: 'header'},
//            {path: '' , component: FooterComponent, outlet: 'footer'}        
//        ],
//        data: {
//            animation: {
//                value: 'doc-front',
//            }
//        }     
//    }
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

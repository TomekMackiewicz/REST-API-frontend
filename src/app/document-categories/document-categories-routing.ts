import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../guards/auth.guard';

import {DocumentCategoriesComponent} from './document-categories.component';
import {DocumentCategoriesEditComponent} from './document-categories-edit.component';
import {DocumentCategoriesCreateComponent} from './document-categories-create.component';
import {DocumentCategoriesFrontComponent} from './document-categories-front.component';
import {MenuComponent} from '../menu/menu.component';
import {FooterComponent} from '../footer/footer.component';

const categoriesRoutes: Routes = [
    {
        path: 'admin', 
            children: [
                {path: 'categories', component: DocumentCategoriesComponent},
                {path: 'categories/:id', component: DocumentCategoriesEditComponent},
                {path: 'category/create', component: DocumentCategoriesCreateComponent},
            ], 
            canActivate: [AuthGuard]
    },
    {
        path: 'categories/:category', 
            children: [
                {path: '' , component: DocumentCategoriesFrontComponent},
                {path: '' , component: MenuComponent, outlet: 'header'},
                {path: '' , component: FooterComponent, outlet: 'footer'}        
            ],
//            data: {
//                animation: {
//                    value: '*',
//                }
//            }            
    }    
];

@NgModule({
    imports: [
        RouterModule.forChild(categoriesRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class DocumentCategoriesRoutingModule {}


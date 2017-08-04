import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { CategoriesComponent } from './categories.component';
import { CategoriesEditComponent } from './categories-edit.component';
import { CategoriesCreateComponent } from './categories-create.component';
import { CategoriesFrontComponent } from './categories-front.component';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';

const categoriesRoutes: Routes = [
    {path: 'admin', 
        children: [
            {path: 'categories', component: CategoriesComponent},
            {path: 'categories/:id', component: CategoriesEditComponent},
            {path: 'category/create', component: CategoriesCreateComponent},
        ],
        data: {
            animation: {
                value: 'categories-admin',
            }
        },         
        canActivate: [AuthGuard]
    },
    {path: 'categories/:category', 
        children: [
            {path: '' , component: CategoriesFrontComponent},
            {path: '' , component: MenuComponent, outlet: 'header'},
            {path: '' , component: FooterComponent, outlet: 'footer'}        
        ],
        data: {
            animation: {
                value: 'categories-front',
            }
        }            
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

export class CategoriesRoutingModule {}


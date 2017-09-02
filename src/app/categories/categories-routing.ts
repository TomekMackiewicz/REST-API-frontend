import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { CategoriesListComponent } from './categories-list.component';
import { CategoriesEditComponent } from './categories-edit.component';
import { CategoriesCreateComponent } from './categories-create.component';
import { CategoriesFrontComponent } from './categories-front.component';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';

const categoriesRoutes: Routes = [
    { path: 'admin', 
        children: [
            {
                path: 'categories', 
                component: CategoriesListComponent,
                data: { 
                    animation: { value: 'categories-list' }
                }                
            },
            { path: 'categories/:id', component: CategoriesEditComponent },
            { path: 'category/create', component: CategoriesCreateComponent },
        ],        
        canActivate: [ AuthGuard ]
    },
    { path: 'categories/:category', 
        children: [
            {
                path: '' , 
                component: CategoriesFrontComponent,
                data: { 
                    animation: { value: 'categories-front' }
                }                
            },
            { path: '' , component: MenuComponent, outlet: 'header' },
            { path: '' , component: FooterComponent, outlet: 'footer' }        
        ]           
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


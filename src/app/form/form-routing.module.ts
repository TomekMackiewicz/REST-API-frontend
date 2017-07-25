import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { FormFrontComponent } from './form-front.component';
import { FormAddComponent } from './form-add.component';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';

const formRoutes: Routes = [
    {path: 'admin', 
        children: [
            {path: 'forms/add', component: FormAddComponent},
        ],
        data: {
            animation: {
                value: 'form-add',
            }
        },         
        canActivate: [AuthGuard] 
    },
//    {path: 'forms', 
//        children: [
//            {path: '' , component: FormFrontComponent},
//            {path: '' , component: MenuComponent, outlet: 'header'},
//            {path: '' , component: FooterComponent, outlet: 'footer'}        
//        ],
//        data: {
//            animation: {
//                value: 'categories-front',
//            }
//        }            
//    } 
    {path: 'forms/:form', 
        children: [
            {path: '' , component: FormFrontComponent},
            {path: '' , component: MenuComponent, outlet: 'header'},
            {path: '' , component: FooterComponent, outlet: 'footer'}        
        ],
//        data: {
//            animation: {
//                value: 'form-front',
//            }
//        }     
    }    
];

@NgModule({
    imports: [
        RouterModule.forChild(formRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class FormRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { AuthGuard } from '../guards/auth.guard';

import { TextComponent } from './text.component';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';

const textRoutes: Routes = [

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
    {path: 'texts/:id', 
        children: [
            {path: '' , component: TextComponent},
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
        RouterModule.forChild(textRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class TextRoutingModule {}


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlagGuard } from '../guards/flag.guard';
import { AuthGuard } from '../guards/auth.guard';
import { TextPreviewComponent } from './text-preview.component';
import { TextFullComponent } from './text-full.component';
import { TextListComponent } from './text-list.component';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';

const textRoutes: Routes = [
    {path: 'admin', 
        children: [
            {path: 'transactions', component: TextListComponent},
        ],
        data: {
            animation: {
                value: 'transactions-admin',
            }
        },         
        canActivate: [AuthGuard]
    },
    {path: 'texts/full/:token', 
        children: [
            { path: '' , component: TextFullComponent},
            { path: '' , component: MenuComponent, outlet: 'header' },
            { path: '' , component: FooterComponent, outlet: 'footer' }        
        ],
//        data: {
//            animation: {
//                value: 'form-front',
//            }
//        }     
    }, 
    {path: 'texts/preview/:id', 
        children: [
            { path: '' , component: TextPreviewComponent},
            { path: '' , component: MenuComponent, outlet: 'header' },
            { path: '' , component: FooterComponent, outlet: 'footer' }        
        ],
        canActivate: [ FlagGuard ]
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


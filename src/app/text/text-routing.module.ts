import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlagGuard } from '../guards/flag.guard';
import { AuthGuard } from '../guards/auth.guard';
import { TextPreviewComponent } from './text-preview.component';
import { TextFullComponent } from './text-full.component';
import { TextTokenComponent } from './text-token.component';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';

const textRoutes: Routes = [
    { path: 'texts/full/:token', 
        children: [
            { 
                path: '' , 
                component: TextFullComponent,
                data: { 
                    animation: { value: 'text-full' }
                }                 
            },
            { path: '' , component: MenuComponent, outlet: 'header' },
            { path: '' , component: FooterComponent, outlet: 'footer' }        
        ]    
    }, 
    { path: 'texts/preview/:id', 
        children: [
            { 
                path: '' , 
                component: TextPreviewComponent,
                data: { 
                    animation: { value: 'text-preview' }
                }                 
            },
            { path: '' , component: MenuComponent, outlet: 'header' },
            { path: '' , component: FooterComponent, outlet: 'footer' }        
        ]    
    },
    { path: 'texts/token', 
        children: [
            { 
                path: '' , 
                component: TextTokenComponent,
                data: { 
                    animation: { value: 'text-token' }
                }                 
            },
            { path: '' , component: MenuComponent, outlet: 'header' },
            { path: '' , component: FooterComponent, outlet: 'footer' }        
        ]    
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


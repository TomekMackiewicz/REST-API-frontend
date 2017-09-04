import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { OrderListComponent } from './order-list.component';
import { OrderPlaceComponent } from './order-place.component';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';

const orderRoutes: Routes = [
    { path: 'admin', 
        children: [
            {
                path: 'orders', 
                component: OrderListComponent,
                data: { 
                    animation: { value: 'order-list' }
                }                
            }
        ],        
        canActivate: [ AuthGuard ]
    },
    { path: 'orders', 
        children: [
            {
                path: '' , 
                component: OrderPlaceComponent,
                data: { 
                    animation: { value: 'order-place' }
                }                
            },
            { path: '' , component: MenuComponent, outlet: 'header' },
            { path: '' , component: FooterComponent, outlet: 'footer' }        
        ]           
    }    
];

@NgModule({
    imports: [
        RouterModule.forChild(orderRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class OrderRoutingModule {}

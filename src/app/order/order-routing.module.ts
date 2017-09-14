import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { OrderListComponent } from './order-list.component';

const orderRoutes: Routes = [
    { path: 'admin', 
        children: [
            {
                path: 'orders', 
                component: OrderListComponent,
                data: { 
                    animation: { value: 'order-list' }
                }                  
            },
        ],        
        canActivate: [ AuthGuard ]
    },       
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



import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { FileAddComponent } from './file-add.component';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';

const fileRoutes: Routes = [
    { path: 'admin', 
        children: [
            { 
                path: 'files/add', 
                component: FileAddComponent,
                data: { 
                    animation: { value: 'file-add' }
                }                  
            },
        ],      
        canActivate: [AuthGuard] 
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(fileRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class FileRoutingModule {}

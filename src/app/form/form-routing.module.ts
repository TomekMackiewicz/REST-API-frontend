import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { PendingChangesGuard } from '../guards/pending-changes.guard';
import { FormFrontComponent } from './form-front.component';
import { FormAddComponent } from './form-add.component';
import { FormEditComponent } from './form-edit.component';
import { FormListComponent } from './form-list.component';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';

const formRoutes: Routes = [
    { path: 'admin', 
        children: [
            { 
                path: 'forms/edit/:id', 
                component: FormEditComponent, 
                canDeactivate: [PendingChangesGuard] 
            },
            { 
                path: 'forms/add', 
                component: FormAddComponent, 
                canDeactivate: [PendingChangesGuard] 
            },
            { 
                path: 'forms', 
                component: FormListComponent,
                data: { 
                    animation: { value: 'form-list' }
                }                  
            }
        ],        
        canActivate: [AuthGuard] 
    },
    {path: 'forms/:id', 
        children: [
            { 
                path: '' , 
                component: FormFrontComponent,
                data: { 
                    animation: { value: 'form-front' }
                }                  
            },
            { path: '' , component: MenuComponent, outlet: 'header' },
            { path: '' , component: FooterComponent, outlet: 'footer' }        
        ]    
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

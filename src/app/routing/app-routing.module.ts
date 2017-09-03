import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontComponent } from '../front/front.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';
import { LogoutComponent } from '../logout/logout.component';
import { PageNotFoundComponent } from '../404/page-not-found.component';
import { AccessDeniedComponent } from '../denied/denied.component';
import { AuthGuard } from '../guards/auth.guard';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';

const routes: Routes = [
    {path: 'login', 
        component: LoginComponent,
        data: {
            animation: {
                value: 'login',
            }
        }                       
    },
    {path: 'logout', 
        component: LogoutComponent,
        data: {
            animation: {
                value: 'logout',
            }
        }                
    },
    {path: 'admin', 
        children: [
            { 
                path: 'dashboard', 
                component: DashboardComponent, 
                data: { 
                    animation: { value: 'dashboard' }
                }
            },               
        ],         
        canActivate: [AuthGuard]        
    },
    {path: '', 
        children:[
            {
                path: '', 
                component: FrontComponent,
                data: {
                    animation: { value: 'front' }
                }                
            },
            {path: '', component: MenuComponent, outlet: 'header'},
            {path: '', component: FooterComponent, outlet: 'footer'},                
        ]   
    },
    {path: 'denied', 
        component: AccessDeniedComponent
    },    
    {path: '**', 
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}

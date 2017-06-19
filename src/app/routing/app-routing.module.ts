import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {FrontComponent} from '../front/front.component';
import {LoginComponent} from '../login/login.component';
import {LogoutComponent} from '../logout/logout.component';
import {PageNotFoundComponent} from '../404/page-not-found.component';
import {AuthGuard} from '../guards/auth.guard';
import {MenuComponent} from '../menu/menu.component';
import {FooterComponent} from '../footer/footer.component';

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
            {path: 'dashboard', component: DashboardComponent},
        ],
        data: {
            animation: {
                value: 'admin',
            }
        },          
        canActivate: [AuthGuard]        
    },
    {path: '', 
        children:[
            {path: '', component: FrontComponent},
            {path: '', component: MenuComponent, outlet: 'header'},
            {path: '', component: FooterComponent, outlet: 'footer'},                
        ],
        data: {
            animation: {
                value: 'home',
            }
        }    
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

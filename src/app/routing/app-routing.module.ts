import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {FrontComponent} from '../components/front/front.component';
import {LoginComponent} from '../components/login/login.component';
import {LogoutComponent} from '../components/logout/logout.component';
import {PageNotFoundComponent} from '../404/page-not-found.component';
import {AuthGuard} from '../guards/auth.guard';
import {MenuComponent} from '../menu/menu.component';
import {FooterComponent} from '../footer/footer.component';

const routes: Routes = [
    {path: 'login', 
        component: LoginComponent        
    },
    {path: 'logout', 
        component: LogoutComponent
    },
    {path: 'admin', 
        children: [
            {path: 'dashboard', component: DashboardComponent},
        ], 
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

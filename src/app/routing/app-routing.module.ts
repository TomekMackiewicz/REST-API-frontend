import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {FrontComponent} from '../components/front/front.component';
import {LoginComponent} from '../components/login/login.component';
import {LogoutComponent} from '../components/logout/logout.component';
import {PageNotFoundComponent} from '../404/page-not-found.component';
import {AuthGuard} from '../guards/auth.guard';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LogoutComponent},
    {
        path: 'admin', children: [
            {path: 'dashboard', component: DashboardComponent},
        ], canActivate: [AuthGuard]
    },
    {path: '', component: FrontComponent},
    { path: '**', component: PageNotFoundComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}

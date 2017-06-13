import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from '../components/dashboard/dashboard.component';
import {FrontComponent} from '../components/front/front.component';
import {LoginComponent} from '../components/login/login.component';
import {LogoutComponent} from '../components/logout/logout.component';
import {AuthGuard} from '../guards/auth.guard';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LogoutComponent},
    {
        path: 'admin', children: [
            {path: 'dashboard', component: DashboardComponent},
        ], canActivate: [AuthGuard]
    },
    {path: '', component: FrontComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}

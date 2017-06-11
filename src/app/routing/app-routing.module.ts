import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from '../components/dashboard/dashboard.component';
import {DocumentComponent} from '../document/document.component';
import {DocumentCreateComponent} from '../document/document-create.component';
import {DocumentEditComponent} from '../document/document-edit.component';
import {FrontComponent} from '../components/front/front.component';
import {AlertComponent} from '../components/alert/alert.component';
import {LoginComponent} from '../components/login/login.component';
import {LogoutComponent} from '../components/logout/logout.component';
import {AuthGuard} from '../guards/auth.guard';
import {DocumentCategoriesComponent} from '../document-categories/document-categories.component';
import {DocumentCategoriesEditComponent} from '../document-categories/document-categories-edit.component';
import {DocumentCategoriesCreateComponent} from '../document-categories/document-categories-create.component';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LogoutComponent},
    {
        path: 'admin', children: [
            {path: 'dashboard', component: DashboardComponent},
            {path: 'documents/:id', component: DocumentEditComponent},
            {path: 'document/create', component: DocumentCreateComponent},
            {path: 'documents', component: DocumentComponent},
            {path: 'categories', component: DocumentCategoriesComponent},
            {path: 'categories/:id', component: DocumentCategoriesEditComponent},
            {path: 'category/create', component: DocumentCategoriesCreateComponent},
        ], canActivate: [AuthGuard]
    },
    {path: '', component: FrontComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}

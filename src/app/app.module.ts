import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AlertModule} from './alert/alert'; // do wywalenia, kiedy wstawię wszędzie
import {DataTableModule} from "angular2-datatable"; //rozparcelować
import {DocumentModule} from './document/document.module';

import {AppComponent} from './app.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {FrontComponent} from './components/front/front.component';
import {MenuComponent} from './menu/menu.component';
import {CategoryComponent} from './category/category.component';
import {FooterComponent} from './components/footer/footer.component'; // do wywalenia potem?

import {LoginComponent} from './components/login/login.component';
import {LogoutComponent} from './components/logout/logout.component';

import {AuthGuard} from './guards/auth.guard';

import {CrudService} from './services/crud.service';
import {AuthenticationService} from './services/authentication.service';
import {DocumentCategoriesComponent} from './document-categories/document-categories.component';
import {DocumentCategoriesEditComponent} from './document-categories/document-categories-edit.component';
import {DocumentCategoriesCreateComponent} from './document-categories/document-categories-create.component';

import {AppRoutingModule} from './routing/app-routing.module';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        AlertModule,
        DataTableModule,
        DocumentModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        FrontComponent,
        CategoryComponent,
        FooterComponent,
        LoginComponent,
        LogoutComponent,
        DocumentCategoriesComponent,
        DocumentCategoriesEditComponent,
        DocumentCategoriesCreateComponent,
        MenuComponent
    ],
    providers: [
        AuthGuard,
        CrudService,
        AuthenticationService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule {}

import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './routing/app-routing.module';

import {DataTableModule} from "angular2-datatable";

import {AppComponent} from './app.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {DocumentComponent} from './document/document.component';
import {DocumentCreateComponent} from './document/document-create.component';
import {DocumentEditComponent} from './document/document-edit.component';
import {FrontComponent} from './components/front/front.component';
import {MenuComponent} from './menu/menu.component';
import {CategoryComponent} from './category/category.component';
import {FrontDocumentComponent} from './front-document/front-document.component';
import {FooterComponent} from './components/footer/footer.component';
import {AlertComponent} from './components/alert/alert.component';
import {LoginComponent} from './components/login/login.component';
import {LogoutComponent} from './components/logout/logout.component';

import {AuthGuard} from './guards/auth.guard';

import {CrudService} from './services/crud.service';
import {AlertService} from './services/alert.service';
import {AuthenticationService} from './services/authentication.service';
import {TinyEditorComponent} from './tiny-editor/tiny-editor.component';
import {DocumentCategoriesComponent} from './document-categories/document-categories.component';
import {DocumentCategoriesEditComponent} from './document-categories/document-categories-edit.component';
import {DocumentCategoriesCreateComponent} from './document-categories/document-categories-create.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        AppRoutingModule,
        DataTableModule
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        DocumentComponent,
        DocumentCreateComponent,
        DocumentEditComponent,
        FrontComponent,
        CategoryComponent,
        FrontDocumentComponent,
        FooterComponent,
        AlertComponent,
        LoginComponent,
        LogoutComponent,
        TinyEditorComponent,
        DocumentCategoriesComponent,
        DocumentCategoriesEditComponent,
        DocumentCategoriesCreateComponent,
        MenuComponent
    ],
    providers: [
        AuthGuard,
        CrudService,
        AlertService,
        AuthenticationService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule {}

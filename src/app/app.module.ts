import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule, Http } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from './alert/alert'; // do wywalenia, kiedy wstawię wszędzie, login jeszcze korzysta
import { DocumentModule } from './document/document.module';
import { CategoriesModule } from './categories/categories.module';
import { FileModule } from './file/file.module';
import { FormModule } from './form/form.module';
import { TextModule } from './text/text.module';
import { OrderModule } from './order/order.module';
import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';
import { FrontComponent } from './front/front.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PageNotFoundComponent } from './404/page-not-found.component';
import { AccessDeniedComponent } from './denied/denied.component';
import { AuthGuard } from './guards/auth.guard';
import { CrudService } from './services/crud.service';
import { AuthenticationService } from './services/authentication.service';
import { AppRoutingModule } from './routing/app-routing.module';
import { LoaderService } from './services/loader.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        FormsModule,
        AlertModule,
        DocumentModule,
        CategoriesModule,
        FileModule,
        FormModule,
        ReactiveFormsModule,
        TextModule,
        OrderModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        })
    ],
    declarations: [
        AppComponent,
        SettingsComponent,
        FrontComponent,
        FooterComponent,
        LoginComponent,
        LogoutComponent,
        MenuComponent,
        PageNotFoundComponent,
        AccessDeniedComponent
    ],
    providers: [
        AuthGuard,
        CrudService,
        AuthenticationService,
        LoaderService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule {}

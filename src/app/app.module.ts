import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpModule, Http} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//import {RouterModule} from '@angular/router';
import {AlertModule} from './alert/alert'; // do wywalenia, kiedy wstawię wszędzie, login jeszcze korzysta
import {DocumentModule} from './document/document.module';
import {DocumentCategoriesModule} from './document-categories/document-categories';
import {FileModule} from './file/file.module';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FrontComponent} from './front/front.component';
import {MenuComponent} from './menu/menu.component';
import {FooterComponent} from './footer/footer.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {PageNotFoundComponent} from './404/page-not-found.component';

import {AuthGuard} from './guards/auth.guard';

import {CrudService} from './services/crud.service';
import {AuthenticationService} from './services/authentication.service';

import {AppRoutingModule} from './routing/app-routing.module';

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
        DocumentCategoriesModule,
        FileModule,
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
        DashboardComponent,
        FrontComponent,
        FooterComponent,
        LoginComponent,
        LogoutComponent,
        MenuComponent,
        PageNotFoundComponent
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

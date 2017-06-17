import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {AuthenticationService} from './services/authentication.service';
import {TranslateService} from '@ngx-translate/core';
import {Location} from '@angular/common';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})

export class AppComponent implements OnDestroy {

    title = 'Main page';
    username: any;
    subscription: Subscription;  

    constructor(
        private translate: TranslateService,
        private authenticationService: AuthenticationService
        ) {
        this.subscription = this.authenticationService.getUsername().subscribe(username => {this.username = username;});
            
        translate.addLangs(["pl", "en", "uk"]);
        translate.setDefaultLang('pl');
        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/pl|en/) ? browserLang : 'pl');       
    }

    ngOnInit() {}

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

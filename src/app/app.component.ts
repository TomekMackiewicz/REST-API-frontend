import {Component, ViewEncapsulation, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {AuthenticationService} from './services/authentication.service';
import {TranslateService} from '@ngx-translate/core';
import {Location} from '@angular/common';
import {Router, ActivatedRoute} from '@angular/router';
import {trigger, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';

const fadeIn = [
    query(':leave', style({ position: 'absolute', left: 0, right: 0, opacity: 1 })),
    query(':enter', style({ position: 'absolute', left: 0, right: 0, opacity: 0 })),
    group([
        query(':leave',
            animate('.3s', style({ opacity: 0 }))),
        query(':enter',
            animate('.3s .3s', style({ opacity: 1 })))
    ])
];

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('routerAnimations', [
            transition('* => *', fadeIn)
        ])
    ]            
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

    prepareRouteTransition(outlet) {
        const animation = outlet.activatedRouteData['animation'] || {};
        console.log(animation['value']);
        return animation['value'] || null;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthenticationService } from './services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, animate, style, group, animateChild, query, stagger, transition } from '@angular/animations';

const fadeIn = [
    query(':leave', style({ position: 'absolute', left: 0, right: 0, opacity: 1 }), { optional: true }),
    query(':enter', style({ position: 'absolute', left: 0, right: 0, opacity: 0 }), { optional: true }),
    group([
        query(':leave',
            animate('.3s', style({ opacity: 0 })),
            { optional: true }),
        query(':enter',
            animate('.3s .3s', style({ opacity: 1 })),
            { optional: true })
    ])
];

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    //changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('routerAnimations', [
            transition('* => *', fadeIn)
        ])
    ]
})

export class AppComponent implements OnInit, OnDestroy {

    title = 'Main page';
    username: any;
    subscription: Subscription;

    constructor(
        private translate: TranslateService,
        private authenticationService: AuthenticationService
    ) {
        translate.addLangs(["pl", "en", "uk"]);
        translate.setDefaultLang('pl');
        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/pl|en/) ? browserLang : 'pl');
        this.username = localStorage.getItem('currentUsername');
    }

    ngOnInit() {
        this.authenticationService.getUsername().subscribe(currentUsername => this.username = currentUsername);
    }

    prepareRouteTransition(outlet) {
        const animation = outlet.activatedRouteData['animation'] || {};
        return animation['value'] || null;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

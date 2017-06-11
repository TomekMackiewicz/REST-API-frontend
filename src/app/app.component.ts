import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {AuthenticationService} from './services/authentication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    //styleUrls: ['./app/css/navbar.css'],
})

export class AppComponent implements OnDestroy {

    title = 'Main page';
    username: any;
    subscription: Subscription;

    constructor(private authenticationService: AuthenticationService) {
        this.subscription = this.authenticationService.getUsername().subscribe(username => {this.username = username;});
    }

    ngOnInit() {}

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

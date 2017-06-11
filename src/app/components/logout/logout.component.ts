import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';

import {AuthenticationService} from '../../services/authentication.service';

@Component({
    //moduleId: module.id,
    selector: 'my-logout',
    template: 'Bye'
})

export class LogoutComponent {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        ) {}

    ngOnInit() {
        this.authenticationService.logout();
        this.returnUrl = '/';             
        this.router.navigate([this.returnUrl]);         
    }
   
}

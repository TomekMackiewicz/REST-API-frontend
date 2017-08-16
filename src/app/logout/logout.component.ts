import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from '../services/authentication.service';
//import { LoaderService } from '../services/loader.service';

@Component({
    selector: 'my-logout',
    template: 'Bye'
})

export class LogoutComponent {
    //model: any = {};
    //loading = false;
    returnUrl: string;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        //private loaderService: LoaderService
        ) {}

    ngOnInit() {
        this.authenticationService.logout();
        this.returnUrl = '/';             
        this.router.navigate([this.returnUrl]);         
    }
   
}

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../alert/alert.service';
import { AuthenticationService } from '../services/authentication.service';
import { LoaderService } from '../services/loader.service';

@Component({
    selector: 'my-login',
    templateUrl: './login.component.html',       
})

export class LoginComponent {
    model: any = {};
    //loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private loaderService: LoaderService) {}

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
    }

    login() {
        //this.loading = true;
        this.loaderService.displayLoader(true);
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
                this.loaderService.displayLoader(false);
            },
            error => {
                this.alertService.error(error);
                //this.loading = false;
                this.loaderService.displayLoader(false);
            });
    }

}

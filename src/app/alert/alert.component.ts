import {Component, OnInit} from '@angular/core';
//import {CommonModule} from '@angular/common';
import {AlertService} from './/alert.service';

@Component({
    //moduleId: module.id,
    selector: 'alert',
    templateUrl: './alert.html'
})

export class AlertComponent {
    message: any;

    constructor(private alertService: AlertService) {}

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => {this.message = message;});
    }
}

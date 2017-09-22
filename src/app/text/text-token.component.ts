import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../alert/alert.service';

@Component({
    selector: 'text-token',
    templateUrl: './text-token.component.html'
})

export class TextTokenComponent implements OnInit {
    
    private token: number;
    private error: boolean;
    
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService       
    ) {}    

    ngOnInit() { 
        this.error = this.isEmpty(this.route.snapshot.queryParams['error']);
        if(this.error) {
            this.alertService.error("Transaction failed!");
        }          
    } 

    redirect() {
        console.log(this.token);
        console.log(this.error); 
        //this.router.navigate(['/texts/full/' + this.token]);
    }

    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key)) {
                return false;                
            }
        }
        return true;
    }       
                                
}

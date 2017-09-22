import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
//import { TextService } from './text.service';
//import { saveAs } from 'file-saver';
import { AlertService } from '../alert/alert.service';
//import { LoaderService } from '../services/loader.service';
//import { Text } from './model/text';

@Component({
    selector: 'text-token',
    templateUrl: './text-token.component.html',
    //providers: [ TextService ]
})

export class TextTokenComponent {
    
    private token: number;
    
    constructor(
        private router: Router
    ) {}    

    redirect() {
        console.log(this.token);
        this.router.navigate(['/texts/full/' + this.token]);
    }
   
                                
}

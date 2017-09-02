import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { TextService } from './text.service';
import { AlertService } from '../alert/alert.service';
import { LoaderService } from '../services/loader.service';

@Component({
    selector: 'text-list',
    templateUrl: './text-list.component.html',
    providers: [ TextService ]
})

export class TextListComponent implements OnInit {

    texts: any;

    constructor(
        private textService: TextService,
        private alertService: AlertService,
        private loaderService: LoaderService,
        private ref: ChangeDetectorRef        
    ) {}
        
    ngOnInit() {      
        this.getTexts();                  
    }    

    getTexts() {
        this.loaderService.displayLoader(true);
        this.textService.getTexts().subscribe(
            data => {
                this.loaderService.displayLoader(false);
                this.texts = data;
                this.ref.detectChanges();                
            },
            error => {
                this.alertService.error("Error loading transactions! " + error);
                this.loaderService.displayLoader(false);
                this.ref.detectChanges();
                return Observable.throw(error);
            }
        );
    }
  
                      
}

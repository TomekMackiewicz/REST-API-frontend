import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TextService } from './text.service';

@Component({
    selector: 'app-text',
    templateUrl: './text.component.html',
    //styleUrls: ['./form.component.css'],
    providers: [ TextService ]
})

export class TextComponent implements OnInit {

    text: string = '';

    constructor(
        private route: ActivatedRoute,
        private textService: TextService,
    
    ) {}
        
    ngOnInit() {      
        this.route.params
            .switchMap((params: Params) => this.textService.getText(+params['id']))
            .subscribe(text => {
                this.text = text
            });
        //console.log(this.text);        
    }    

         
                  
}


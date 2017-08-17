import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TextService } from './text.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-text',
    templateUrl: './text-full.component.html',
    //styleUrls: ['./form.component.css'],
    providers: [ TextService ]
})

export class TextFullComponent implements OnInit {

    text: any;
    //showToken: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private textService: TextService    
    ) {}
        
    ngOnInit() {      
        this.route.params
            .switchMap((params: Params) => this.textService.getTextByToken(+params['token']))
            .subscribe(text => { 
                this.text = text;
                let blob = new Blob([this.text.body], {type: "text/plain;charset=utf-8"}); //type: 'application/pdf' 
                saveAs(blob, this.text.title+".txt");                  
            });                   
    }    

//    saveText() {
//        //this.showToken = true;
//        let blob = new Blob([this.text.body], {type: "text/plain;charset=utf-8"}); //type: 'application/pdf' 
//        saveAs(blob, this.text.title+".txt");        
//    }     
                  
}



import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TextService } from './text.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-text',
    templateUrl: './text-preview.component.html',
    //styleUrls: ['./form.component.css'],
    providers: [ TextService ]
})

export class TextPreviewComponent implements OnInit {

    text: any;
    //showToken: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private textService: TextService    
    ) {}
        
    ngOnInit() {      
        this.route.params
            .switchMap((params: Params) => this.textService.getTextByID(+params['id']))
            .subscribe(text => { this.text = text });       
    }    

    saveText() {
        //this.showToken = true;
        //let blob = new Blob([this.text.body], {type: "text/plain;charset=utf-8"}); //type: 'application/pdf' 
        //saveAs(blob, this.text.title+".txt");
        this.router.navigateByUrl('texts/full/'+this.text.token);        
    }     
                  
}


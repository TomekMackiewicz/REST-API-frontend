import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { TextService } from './text.service';

@Component({
    selector: 'admin-text',
    templateUrl: './text-admin.component.html',
    //styleUrls: ['./form.component.css'],
    providers: [ TextService ]
})

export class TextAdminComponent implements OnInit {

    texts: any;

    constructor(private textService: TextService) {}
        
    ngOnInit() {      
        this.getTexts();                  
    }    

    getTexts() {
        this.textService.getTexts().subscribe(
            data => {this.texts = data},
            err => console.error(err),
            () => console.log('done loading texts')
        );
    }
  
                      
}

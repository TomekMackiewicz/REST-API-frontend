import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TextService } from './text.service';
import { saveAs } from 'file-saver';
import { AlertService } from '../alert/alert.service';
import * as jsPDF from "jspdf";
import * as html2canvas from "html2canvas";

@Component({
    selector: 'app-text',
    templateUrl: './text-full.component.html',
    //styleUrls: ['./form.component.css'],
    providers: [ TextService ]
})

export class TextFullComponent implements OnInit {

    text: any;

    constructor(
        private route: ActivatedRoute,
        private textService: TextService,
        private alertService: AlertService    
    ) {}
        
    ngOnInit() {      
        this.route.params
            .switchMap((params: Params) => this.textService.getTextByToken(+params['token']))
            .subscribe(
                text => { 
                    this.text = text;                 
                },
                error => {
                    this.alertService.error("Document not found! " + error);
                    //return Observable.throw(error);
                }                
            );                   
    }    

    downloadPDF() {
        this.htmlToText();
        var doc = new jsPDF();
        doc.text(20, 20, this.text.title);
        doc.text(20, 30, this.text.body);
        //doc.addPage();
        //doc.text(20, 20, 'Do you like that?');
        doc.save(this.text.title + ".pdf");
    }

    downloadDOC() {
        this.htmlToText();
        let blob = new Blob([this.text.body], {type: "text/plain;charset=utf-8"}); //type: 'application/pdf' 
        saveAs(blob, this.text.title + ".doc");        
    }     

    htmlToText() {
        var htmlToText = require('html-to-text');
        this.text.body = htmlToText.fromString(this.text.body, {
            wordwrap: 80,
            preserveNewlines: true,
        });  
    }                      
}
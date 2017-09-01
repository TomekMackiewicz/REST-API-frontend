import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TextService } from './text.service';
import { saveAs } from 'file-saver';
import { AlertService } from '../alert/alert.service';
import { LoaderService } from '../services/loader.service';
import * as jsPDF from "jspdf";

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
        private alertService: AlertService,
        private loaderService: LoaderService,
        private ref: ChangeDetectorRef
    ) {}
        
    ngOnInit() {
        this.loaderService.displayLoader(true);      
        this.route.params
            .switchMap((params: Params) => this.textService.getTextByToken(+params['token']))
            .subscribe(
                text => { 
                    this.loaderService.displayLoader(false);
                    this.text = text;
                    this.ref.detectChanges();                 
                },
                error => {
                    this.alertService.error("Error loading document! " + error);
                    this.loaderService.displayLoader(false);
                    this.ref.detectChanges(); // czy potrzebne?
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
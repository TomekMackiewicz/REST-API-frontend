import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TextService } from './text.service';
import { saveAs } from 'file-saver';
import { AlertService } from '../alert/alert.service';
import { LoaderService } from '../services/loader.service';
import * as jsPDF from "jspdf";
import * as html2canvas from "html2canvas";

@Component({
    selector: 'text-full',
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
let doc = new jsPDF();

// Add a title to your PDF
doc.setFontSize(30); 
doc.text(12, 10, this.text.title);

// Create your table here (The dynamic table needs to be converted to canvas).
let element = this.text.body;
html2canvas(element)
.then((canvas: any) => {
    doc.addImage(canvas.toDataURL("image/jpeg"), "JPEG", 0, 50, doc.internal.pageSize.width, element.offsetHeight / 5 );
    doc.save(`test.pdf`);
})        
        //let text = this.text.body;
//const elementToPrint = this.text.body; //The html element to become a pdf
//const pdf = new jsPDF('p', 'pt', 'a4');
//pdf.addHTML(elementToPrint, () => {
//    pdf.save('web.pdf');
//});        
        //let ttt = html2canvas(text); 
             
        //let body = html2canvas(this.text.body);
        //let doc = new jsPDF();  
        //doc.text(10, 10, text);      
        //doc.text(20, 20, this.text.title);
        //doc.text(20, 30, this.text.body);
        //doc.addPage();
        //doc.text(20, 20, 'Do you like that?');
        //doc.save(this.text.title + ".pdf");
    }

    downloadDOC() {
        let title = '<h1 style="text-align: center;">' + this.text.title + '</h1>';
        let body = this.text.body;
        let content = title.concat(body);
        let blob = new Blob([content], {type: "text/plain;charset=utf-8"});
        saveAs(blob, this.text.title + ".doc");        
    }                     
}
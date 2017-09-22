import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TextService } from './text.service';
import { saveAs } from 'file-saver';
import { AlertService } from '../alert/alert.service';
import { LoaderService } from '../services/loader.service';
import * as jsPDF from "jspdf";
import * as html2canvas from "html2canvas";
import { Text } from './model/text';

@Component({
    selector: 'text-full',
    templateUrl: './text-full.component.html',
    providers: [ TextService ]
})

export class TextFullComponent implements OnInit {

    private text: Text;

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
                data => { 
                    this.loaderService.displayLoader(false);
                    this.text = new Text(data);
                    this.ref.detectChanges();
                },
                error => {
                    this.alertService.error("Error loading document! " + error);
                    this.loaderService.displayLoader(false);
                    this.ref.detectChanges(); // czy potrzebne?
                }                
            );             
    }    

    downloadDOC() {
        let title = '<h1 style="text-align: center;">' + this.text.title + '</h1>';
        let body = this.text.body;
        let content = title.concat(body);
        let blob = new Blob([content], {type: "text/plain;charset=utf-8"});
        saveAs(blob, this.text.title + ".doc"); // add underscore if white space        
    } 

    downloadPDF() {
        html2canvas(document.getElementById('canvas'))
            .then((canvas) => {   
                let imgWidth = 210;
                let pageHeight = 295;
                let imgHeight = canvas.height * imgWidth / canvas.width;
                let heightLeft = imgHeight;                            
                let doc = new jsPDF('p', 'mm'); 
                let position = 0;
                               
                doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight);               
                heightLeft -= pageHeight; 
                
                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    doc.addPage();
                    doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight);                    
                    heightLeft -= pageHeight;
                } 
                                             
                doc.save(this.text.title + ".pdf");
            })
            .catch(error => {
                this.alertService.error("Error generating PDF. " + error);
            });        
    }    
                                
}
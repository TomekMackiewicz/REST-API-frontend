import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentService } from './document.service';
import { LoaderService } from '../services/loader.service';
import { AlertService } from '../alert/alert.service';

@Component({
    selector: 'document-list',
    templateUrl: './document-list.component.html',
})

export class DocumentListComponent implements OnInit {

    public documents: any;

    constructor(
        private documentService: DocumentService,
        private loaderService: LoaderService,
        private alertService: AlertService,
        private ref: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.getDocuments();
    }

    getDocuments() {
        this.loaderService.displayLoader(true);
        this.documentService.getDocuments().subscribe(
            data => {
                this.loaderService.displayLoader(false);
                this.documents = data;
                this.ref.detectChanges();
            },
            error => {
                this.loaderService.displayLoader(false);
                this.alertService.error("Error loading forms! " + error);
                this.ref.detectChanges();
            }
        );
    }

    deleteDocument(document: any) {
        if (confirm("Are you sure you want to delete " + document.title + "?")) {
            this.loaderService.displayLoader(true);
            this.documentService.deleteDocument(document).subscribe(
                data => {
                    this.getDocuments();                    
                    this.loaderService.displayLoader(false); // czy tu potrzebne?                   
                    this.ref.markForCheck(); // czy tu potrzebne?
                    this.alertService.success("Document deleted.");
                },
                error => {
                    this.loaderService.displayLoader(false);
                    this.ref.markForCheck();
                    this.alertService.success("Error deleting document!" + error);
                    return Observable.throw(error);
                }
            );
        }
    }

}

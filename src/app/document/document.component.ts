import {Component, OnInit} from '@angular/core';
import {DocumentService} from './document.service';
import {Observable} from 'rxjs/Rx';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-document',
    templateUrl: './document.component.html',
})

export class DocumentComponent implements OnInit {

    public documents: any;

    constructor(private documentService: DocumentService) {}

    ngOnInit() {
        this.getDocuments();
    }

    getDocuments() {
        this.documentService.getDocuments().subscribe(
            data => {this.documents = data},
            err => console.error(err),
            () => console.log('done loading documents')
        );
    }

    deleteDocument(document: any) {
        if (confirm("Are you sure you want to delete " + document.title + "?")) {
            this.documentService.deleteDocument(document).subscribe(
                data => {
                    this.getDocuments();
                    return true;
                },
                error => {
                    console.error("Error deleting document!");
                    return Observable.throw(error);
                }
            );
        }
    }

}

import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';
import { UploadFileService } from '../services/upload-file.service';
import { CrudService } from '../services/crud.service';
import { AlertService } from '../alert/alert.service';

@Component({
    selector: 'file-add',
    templateUrl: './file-add.component.html',
    providers: [ UploadFileService ]
})

export class FileAddComponent {
    
    private maxUploadSize: number = 1000000;
    public files: any;
    
    constructor(
        private fileUploader: UploadFileService,
        private elem: ElementRef,
        private route: ActivatedRoute,
        private crudService: CrudService,
        private alertService: AlertService
    ) {}

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.crudService.getFiles())
            .subscribe(
                data => {this.files = data},
                err => console.error(err),
                () => console.log('done loading categories')            
            );
    }    
        
    public uploadFile(): void {
        let files = this.elem.nativeElement.querySelector('#file').files;
        let file = files[0];        
        let formData = new FormData();
        //console.log(file.size);
        if (this.maxSize(file.size)) {
            formData.append('file', file, file.name);
            this.fileUploader.uploadFile(formData)
                .subscribe(
                    //res => this.dataLoaded(res),
                    data => {
                        this.alertService.success('File added.');
                        return true;
                    },
                    error => {
                        this.alertService.error("Error adding file! " + error);
                        return Observable.throw(error);
                    }            
                );             
        } else {
            this.alertService
                .error('Max upload size is ' 
                    + (this.maxUploadSize / 1000) 
                    + ' kB. File size is ' 
                    + (file.size / 1000) + ' kB.');
        }
   
    }    
        
    private maxSize(size) {
        if (size > this.maxUploadSize) {
            return false;
        } else {
            return true;
        }
    }
    
    private dataLoaded(data: any): void {
        
    }
    
}

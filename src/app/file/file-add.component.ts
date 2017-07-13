import { Component, ElementRef } from '@angular/core';
import { UploadFileService } from '../services/upload-file.service';

@Component({
    selector: 'file-add',
    templateUrl: './file-add.component.html',
    providers: [ UploadFileService ]
})

export class FileAddComponent {
    
    constructor(
        private fileUploader: UploadFileService,
        private elem: ElementRef
    ) {}
    
    public uploadImage(): void {
        let files = this.elem.nativeElement.querySelector('#file').files;
        let formData = new FormData();
        let file = files[0];
        formData.append('file', file, file.name);
        this.fileUploader.uploadImage(formData)
        .subscribe(res => this.dataLoaded(res));
    }
    
    private dataLoaded(data: any): void {
        
    }
    
}

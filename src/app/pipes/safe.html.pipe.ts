import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({name: 'safeHtml'})

export class SafeHtmlPipe {

    constructor(private sanitizer: DomSanitizer) {}

    transform(text: string) {
        //return this.sanitizer.bypassSecurityTrustStyle(style);
        return this.sanitizer.bypassSecurityTrustHtml(text);
        // return this.sanitizer.bypassSecurityTrustXxx(style); - see docs
    }
}

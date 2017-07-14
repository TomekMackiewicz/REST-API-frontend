import { Injectable } from '@angular/core'; 
import { Http, Response } from '@angular/http'; 
import { Observable } from 'rxjs/Observable'; 
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/observable/throw';

@Injectable()
export class UploadFileService {
    
    constructor(private http: Http) {}
    
    public uploadFile(formData: any) {
        let url: string = 'http://localhost:8000/files?uploadType=formData';
        return this.http.post(url, formData)
        .catch(this.errorHandler);
    }
    
    private errorHandler(error: Response) {
        console.error('Error: ' + error);
        return Observable.throw(error || 'Server error occured.');
    }
    
    // remove? Tę funkcję dodałem do CrudService
    public getFilesList() {
        let url: string = 'http://get-files';
        return this.http.get(url)
        .catch(this.errorHandler);
    }
} 

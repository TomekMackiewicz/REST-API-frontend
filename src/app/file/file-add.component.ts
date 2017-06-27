import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'add-file',
  template: `
  <div class="container">
    <h1>Angular Form w/ File Upload (FormData)</h1>
    <p>The selected file is POSTed to https://httpbin.org/post <b>ON FIELD CHANGE</b>.</p>
    <p>The response is logged to the console.</p>
    <form [formGroup]="myForm">
      <div class="form-group">
        <input type="file" formControlName="file1" (change)="uploadFile($event)">
      </div>
    </form>
  </div>
  `
})
export class FileAddComponent {
  myForm: FormGroup;
  constructor(fb: FormBuilder, private http: Http) {
    this.myForm = fb.group({
      file1: []
    });
  }
  uploadFile(evt) {
    const files = evt.target.files;
    console.log('Uploading file...', files);
    
    if (files.length > 0) {
      let file;
      let formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        file = files[i];
        formData.append('userfile', file, file.name);
      }
      this.http.post('http://localhost:8000/uploads', formData)
        .map(resp => resp.json())
        .subscribe(data => console.log('response', data));
    }
  }
}

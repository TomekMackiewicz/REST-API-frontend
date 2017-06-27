import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { ReactiveFormsModule }  from '@angular/forms';
import { HttpModule }  from '@angular/http';

import { FileAddComponent } from './file-add.component';

import {FileRoutingModule} from './file-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    FileRoutingModule
  ],
  declarations: [FileAddComponent],
  providers: [],
  bootstrap: [ FileAddComponent ]
})
export class FileModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // ?
import { BrowserModule } from '@angular/platform-browser'; // ?
import { TextRoutingModule } from './text-routing.module';
import { TextComponent } from './text.component';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { SafeHtmlPipe } from '../pipes/safe.html.pipe';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        TextRoutingModule
    ],
    declarations: [
        TextComponent, 
        TruncatePipe,
        SafeHtmlPipe
    ],
    providers: []
})
export class TextModule {}



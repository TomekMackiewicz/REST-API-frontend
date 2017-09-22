import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // ?
import { BrowserModule } from '@angular/platform-browser'; // ?
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextRoutingModule } from './text-routing.module';
import { TextPreviewComponent } from './text-preview.component';
import { TextFullComponent } from './text-full.component';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { SafeHtmlPipe } from '../pipes/safe.html.pipe';
import { AlertModule } from '../alert/alert.module';
import { FlagGuard } from '../guards/flag.guard';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        TextRoutingModule,
        AlertModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        TextPreviewComponent,
        TextFullComponent,
        TruncatePipe,
        SafeHtmlPipe
    ],
    providers: [ FlagGuard ]
})
export class TextModule {}



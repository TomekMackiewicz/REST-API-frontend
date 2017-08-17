import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // ?
import { BrowserModule } from '@angular/platform-browser'; // ?
import { TextRoutingModule } from './text-routing.module';
import { TextPreviewComponent } from './text-preview.component';
import { TextFullComponent } from './text-full.component';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { SafeHtmlPipe } from '../pipes/safe.html.pipe';
import { AlertModule } from '../alert/alert';
import { FlagGuard } from '../guards/flag.guard';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        TextRoutingModule,
        AlertModule
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



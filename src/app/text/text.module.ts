import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // ?
import { BrowserModule } from '@angular/platform-browser'; // ?
import { TextRoutingModule } from './text-routing.module';
import { TextComponent } from './text.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        TextRoutingModule
    ],
    declarations: [TextComponent],
    providers: []
})
export class TextModule {}



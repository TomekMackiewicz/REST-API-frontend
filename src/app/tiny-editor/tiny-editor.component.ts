import {
    Component,
    NgZone,
    OnDestroy,
    AfterViewInit,
    EventEmitter,
    Input,
    Output
} from '@angular/core';

import {forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/table';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/code';
import 'tinymce/plugins/media';
import 'tinymce/plugins/paste';

declare var tinymce: any;

const noop = () => {}; // does nothing. Signals that no operation is required

@Component({
    selector: 'simple-tiny',
    template: `<textarea id="{{elementId}}" [attr.name]="name"></textarea>`,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TinyEditorComponent),
        multi: true
    }]

})
export class TinyEditorComponent implements AfterViewInit, OnDestroy, ControlValueAccessor {

    @Input() elementId: String;
    @Input() name: String;
    @Output() onEditorKeyup = new EventEmitter<any>();

    constructor(private ngZone: NgZone) {}

    editor;

    // using '_value' because variable 'value' is already defined by get()/set()
    private _value: string = '';

    // Callback registered via registerOnTouched (ControlValueAccessor)
    private onTouchedCallback: () => void = noop;

    // Callback registered via registerOnChange (ControlValueAccessor)
    private onChangeCallback: (_: any) => void = noop;

    ngAfterViewInit() {
        this.ngZone.runOutsideAngular(() => {
            tinymce.init({
                selector: '#' + this.elementId,
                file_picker_callback: function(callback, value, meta) {
                    // Provide file and text for the link dialog
                    if (meta.filetype == 'file') {
                        callback('mypage.html', {text: 'My text'});
                    }
                    // Provide image and alt text for the image dialog
                    if (meta.filetype == 'image') {
                        callback('myimage.jpg', {alt: 'My alt text'});
                    }
                    // Provide alternative source and posted for the media dialog
                    if (meta.filetype == 'media') {
                        callback('movie.mp4', {source2: 'alt.ogg', poster: 'image.jpg'});
                    }
                },
                file_picker_types: 'file image media',
                //images_upload_url: 'postAcceptor.php',
                automatic_uploads: true,
                menubar: true,
                height: '480',
                plugins: ['link', 'table', 'image', 'lists', 'advlist', 'anchor', 'code', 'media', 'paste'],
                toolbar1: 'bold italic indent outdent table | link | lists advlist | code | image media',
                //toolbar2: 'table lists advlist',
                skin_url: '/assets/skins/lightgray',
                setup: editor => {
                    this.editor = editor;
                    editor.on('keyup', (e) => {
                        const content = editor.getContent();
                        this.onEditorKeyup.emit(content);
                        this.value = content;

                        //
                        // This tells ng to update the model (div in main area) with new HTML in editor pane
                        // See:  https://community.tinymce.com/communityQuestion?id=90661000000IetUAAS
                        // and:  https://blog.thoughtram.io/angular/2016/02/01/zones-in-angular-2.html
                        //
                        //this.ngZone.run(() => {});
                    });

                    // This fires when operator clicks toolbar button, e.g. Bold, Italics, Indent, etc.
                    editor.on('ExecCommand', (e) => {
                        const content = editor.getContent();
                        this.value = content;
                    });

                    editor.on('NodeChange', (e) => {
                        const content = editor.getContent();
                        this.value = content;
                    });
                }
            });
        })
    }

    /**
     * Cleans up text editor when page is unloaded
     */
    ngOnDestroy() {
        tinymce.remove(this.editor);
    }

    get value(): any {
        return this._value;
    }

    @Input()
    set value(value: any) {
        if (value !== this._value) {
            this._value = value;
            this.onChangeCallback(value);
        }
    }

    /**
     * Takes a new value from the form model and writes it into the view, and initializes rich text editor with same value.
     *
     * @param value
     */
    writeValue(value: string) {
        if (value !== undefined) {
            this._value = value;
            if (this._value != null) {
                this.editor.setContent(this._value);
            }
        }
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    /**
     * We don't want anything special when touched.
     * Keeping as empty implementation.
     */
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
}


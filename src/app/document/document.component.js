"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var demo_service_1 = require("../../services/demo.service");
var Rx_1 = require("rxjs/Rx");
//import {Document} from './document';
var DocumentsComponent = (function () {
    function DocumentsComponent(_demoService) {
        this._demoService = _demoService;
    }
    DocumentsComponent.prototype.ngOnInit = function () {
        this.getDocuments();
    };
    //    getDocument(id) {
    //        this._demoService.getDocument().subscribe(
    //            data => {this.document = data},
    //            err => console.error(err),
    //            () => console.log('done loading document')
    //        );
    //    }
    DocumentsComponent.prototype.getDocuments = function () {
        var _this = this;
        this._demoService.getDocuments().subscribe(function (data) { _this.documents = data; }, function (err) { return console.error(err); }, function () { return console.log('done loading documents'); });
    };
    //    createDocument(title, body) {
    //        let document = {title: title, body: body};
    //        this._demoService.createDocument(document).subscribe(
    //            data => {
    //                this.getDocuments();
    //                return true;
    //            },
    //            error => {
    //                console.error("Error saving document!");
    //                return Observable.throw(error);
    //            }
    //        );
    //    }
    //    updateDocument(document) {
    //        this._demoService.updateDocument(document).subscribe(
    //            data => {
    //                this.getDocuments();
    //                return true;
    //            },
    //            error => {
    //                console.error("Error saving document!");
    //                return Observable.throw(error);
    //            }
    //        );
    //    }
    DocumentsComponent.prototype.deleteDocument = function (document) {
        var _this = this;
        if (confirm("Are you sure you want to delete " + document.title + "?")) {
            this._demoService.deleteDocument(document).subscribe(function (data) {
                // refresh the list
                _this.getDocuments();
                return true;
            }, function (error) {
                console.error("Error deleting document!");
                return Rx_1.Observable.throw(error);
            });
        }
    };
    DocumentsComponent.prototype.onSelect = function (document) {
        console.log(document);
    };
    return DocumentsComponent;
}());
DocumentsComponent = __decorate([
    core_1.Component({
        selector: 'demo-app',
        templateUrl: './app/templates/list.html',
    }),
    __metadata("design:paramtypes", [demo_service_1.DemoService])
], DocumentsComponent);
exports.DocumentsComponent = DocumentsComponent;
//# sourceMappingURL=documents.component.js.map
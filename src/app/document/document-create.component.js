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
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
require("rxjs/add/operator/switchMap");
var Rx_1 = require("rxjs/Rx");
var demo_service_1 = require("../../services/demo.service");
var DocumentCreateComponent = (function () {
    function DocumentCreateComponent(_demoService, route, location) {
        this._demoService = _demoService;
        this.route = route;
        this.location = location;
    }
    //    ngOnInit(): void {
    //        this.route.params
    //            .switchMap((params: Params) => this._demoService.getDocument(+params['id']))
    //            .subscribe(document => this.document = document);
    //    }
    DocumentCreateComponent.prototype.goBack = function () {
        this.location.back();
    };
    DocumentCreateComponent.prototype.createDocument = function (title, body) {
        var document = { title: title, body: body };
        this._demoService.createDocument(document).subscribe(function (data) {
            //this.getDocuments();
            return true;
        }, function (error) {
            console.error("Error saving document!");
            return Rx_1.Observable.throw(error);
        });
    };
    return DocumentCreateComponent;
}());
DocumentCreateComponent = __decorate([
    core_1.Component({
        selector: 'document-create',
        templateUrl: 'http://localhost:3000/app/templates/document-create.html',
    }),
    __metadata("design:paramtypes", [demo_service_1.DemoService,
        router_1.ActivatedRoute,
        common_1.Location])
], DocumentCreateComponent);
exports.DocumentCreateComponent = DocumentCreateComponent;
//# sourceMappingURL=document-create.component.js.map
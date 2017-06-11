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
var DocumentDetailComponent = (function () {
    function DocumentDetailComponent(_demoService, route, location) {
        this._demoService = _demoService;
        this.route = route;
        this.location = location;
    }
    DocumentDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this._demoService.getDocument(+params['id']); })
            .subscribe(function (document) { return _this.document = document; });
    };
    DocumentDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    DocumentDetailComponent.prototype.updateDocument = function (document) {
        this._demoService.updateDocument(document).subscribe(function (data) {
            //this.getDocuments();
            console.log('updated');
            return true;
        }, function (error) {
            console.error("Error saving document!");
            return Rx_1.Observable.throw(error);
        });
    };
    return DocumentDetailComponent;
}());
DocumentDetailComponent = __decorate([
    core_1.Component({
        selector: 'document-detail',
        templateUrl: 'http://localhost:3000/app/templates/document-detail.html',
    }),
    __metadata("design:paramtypes", [demo_service_1.DemoService,
        router_1.ActivatedRoute,
        common_1.Location])
], DocumentDetailComponent);
exports.DocumentDetailComponent = DocumentDetailComponent;
//# sourceMappingURL=document-detail.component.js.map
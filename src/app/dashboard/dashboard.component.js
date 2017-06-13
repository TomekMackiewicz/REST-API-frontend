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
var DashboardComponent = (function () {
    function DashboardComponent(_demoService) {
        this._demoService = _demoService;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.getDocuments();
    };
    DashboardComponent.prototype.getDocuments = function () {
        var _this = this;
        this._demoService.getDocuments().subscribe(function (data) { _this.documents = data; }, function (err) { return console.error(err); }, function () { return console.log('done loading documents'); });
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        selector: 'my-dashboard',
        templateUrl: './app/templates/dashboard.html'
    }),
    __metadata("design:paramtypes", [demo_service_1.DemoService])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map
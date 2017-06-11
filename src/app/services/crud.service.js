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
var http_1 = require("@angular/http");
var DemoService = (function () {
    function DemoService(http) {
        this.http = http;
    }
    DemoService.prototype.getDocument = function (id) {
        return this.http.get('http://localhost:8000/posts/' + id)
            .map(function (res) { return res.json(); });
    };
    DemoService.prototype.getDocuments = function () {
        return this.http.get('http://localhost:8000/posts')
            .map(function (res) { return res.json(); });
    };
    DemoService.prototype.createDocument = function (document) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = document;
        return this.http.post('http://localhost:8000/posts', body, headers);
        //.map((res:Response) => res.json());
    };
    DemoService.prototype.updateDocument = function (document) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = document;
        return this.http.put('http://localhost:8000/posts/' + document.id, body, headers);
        //.map((res: Response) => res.json());
    };
    DemoService.prototype.deleteDocument = function (document) {
        return this.http.delete('http://localhost:8000/posts/' + document.id);
    };
    return DemoService;
}());
DemoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], DemoService);
exports.DemoService = DemoService;
//# sourceMappingURL=demo.service.js.map
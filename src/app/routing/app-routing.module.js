"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var dashboard_component_1 = require("../../components/dashboard/dashboard.component");
var documents_component_1 = require("../../components/documents/documents.component");
var document_create_component_1 = require("../../components/document-create/document-create.component");
var document_detail_component_1 = require("../../components/document-detail/document-detail.component");
var front_component_1 = require("../../components/front/front.component");
var login_component_1 = require("../../components/login/login.component");
var logout_component_1 = require("../../components/logout/logout.component");
var auth_guard_1 = require("../../guards/auth.guard");
var routes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'logout', component: logout_component_1.LogoutComponent },
    {
        path: 'admin', children: [
            { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
            { path: 'documents/:id', component: document_detail_component_1.DocumentDetailComponent },
            { path: 'document/create', component: document_create_component_1.DocumentCreateComponent },
            { path: 'documents', component: documents_component_1.DocumentsComponent },
        ], canActivate: [auth_guard_1.AuthGuard]
    },
    { path: '', component: front_component_1.FrontComponent }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map
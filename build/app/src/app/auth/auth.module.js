"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const flex_layout_1 = require("@angular/flex-layout");
const material_1 = require("@angular/material");
const forms_1 = require("@angular/forms");
const http_1 = require("@angular/common/http");
const auth_routing_module_1 = require("./auth-routing.module");
const login_component_1 = require("./login/login.component");
const shared_module_1 = require("../@shared/shared.module");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    core_1.NgModule({
        declarations: [login_component_1.LoginComponent],
        imports: [
            common_1.CommonModule,
            auth_routing_module_1.AuthRoutingModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            http_1.HttpClientModule,
            material_1.MatInputModule,
            material_1.MatCheckboxModule,
            material_1.MatButtonModule,
            shared_module_1.SharedModule,
            flex_layout_1.FlexLayoutModule.withConfig({ addFlexToParent: false }),
        ],
        providers: [],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map
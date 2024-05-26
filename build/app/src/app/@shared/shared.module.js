"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModule = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const message_service_1 = require("./message/message.service");
const snack_bar_1 = require("@angular/material/snack-bar");
const core_2 = require("@agm/core");
const webservice_handler_service_1 = require("./services/webservice-handler.service");
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    core_1.NgModule({
        declarations: [],
        imports: [
            common_1.CommonModule,
            snack_bar_1.MatSnackBarModule,
            core_2.AgmCoreModule.forRoot({
                apiKey: 'AIzaSyBVtvWE1MACKfSVPLmU7HuTo8mgfjSh-uo',
            }),
        ],
        exports: [
            core_2.AgmCoreModule
        ],
        providers: [
            message_service_1.MessageService,
            webservice_handler_service_1.WebserviceHandlerService
        ]
    })
], SharedModule);
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map
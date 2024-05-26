"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatModule = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const stat_component_1 = require("./stat.component");
const material_1 = require("@angular/material");
const material_2 = require("@angular/material");
let StatModule = class StatModule {
};
StatModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, material_1.MatCardModule, material_2.MatGridListModule, material_2.MatIconModule],
        declarations: [stat_component_1.StatComponent],
        exports: [stat_component_1.StatComponent],
    })
], StatModule);
exports.StatModule = StatModule;
//# sourceMappingURL=stat.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarComponent = void 0;
const core_1 = require("@angular/core");
let SidebarComponent = class SidebarComponent {
    constructor(authService) {
        this.authService = authService;
        this.authService.currentUser.subscribe((res) => {
            this.currentUser = res;
        });
    }
    ngOnInit() {
        this.showMenu = "";
    }
    addExpandClass(element) {
        if (element === this.showMenu) {
            this.showMenu = "0";
        }
        else {
            this.showMenu = element;
        }
    }
    get isAdmin() {
        return this.currentUser && this.currentUser["role"] === 2;
    }
};
SidebarComponent = __decorate([
    core_1.Component({
        selector: "app-sidebar",
        templateUrl: "./sidebar.component.html",
        styleUrls: ["./sidebar.component.scss"],
    })
], SidebarComponent);
exports.SidebarComponent = SidebarComponent;
//# sourceMappingURL=sidebar.component.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopnavComponent = void 0;
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
let TopnavComponent = class TopnavComponent {
    constructor(router, translate) {
        this.router = router;
        this.translate = translate;
        this.router.events.subscribe((val) => {
            if (val instanceof router_1.NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()) {
                this.toggleSidebar();
            }
        });
    }
    ngOnInit() {
        this.pushRightClass = "push-right";
    }
    isToggled() {
        const dom = document.querySelector("body");
        return dom.classList.contains(this.pushRightClass);
    }
    toggleSidebar() {
        const dom = document.querySelector("body");
        dom.classList.toggle(this.pushRightClass);
    }
    onLoggedout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.router.navigate(["/login"]);
    }
    changeLang(language) {
        this.translate.use(language);
    }
};
TopnavComponent = __decorate([
    core_1.Component({
        selector: "app-topnav",
        templateUrl: "./topnav.component.html",
        styleUrls: ["./topnav.component.scss"],
    })
], TopnavComponent);
exports.TopnavComponent = TopnavComponent;
//# sourceMappingURL=topnav.component.js.map
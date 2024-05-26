"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginComponent = void 0;
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const environment_1 = require("src/environments/environment");
const api_1 = require("../../@shared/services/api");
let LoginComponent = class LoginComponent {
    constructor(_webservice, _message, fb, router) {
        this._webservice = _webservice;
        this._message = _message;
        this.fb = fb;
        this.router = router;
        this.env = environment_1.environment;
        this.api = api_1.api;
    }
    ngOnInit() {
        this.initForm();
    }
    initForm() {
        this.formGroup = this.fb.group({
            un: ["", forms_1.Validators.required],
            pwd: ["", forms_1.Validators.required],
        });
    }
    onLogin(formGroup) {
        if (formGroup.invalid) {
            this.router.navigate(["/dashboard"]);
            return;
        }
        this._webservice
            .Post(`${this.env.baseUrl + this.api.login}`, formGroup.value)
            .subscribe((res) => {
            if (res) {
                localStorage.setItem("token", `jwt ${res.authToken}`);
                localStorage.setItem("user", JSON.stringify(res));
                this.router.navigate(["/dashboard"]);
            }
            this._message.succmessage(res.message);
        }, (err) => {
            this._message.errmessage(err);
        });
    }
};
LoginComponent = __decorate([
    core_1.Component({
        selector: "app-login",
        templateUrl: "./login.component.html",
        styleUrls: ["./login.component.scss"],
    })
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map
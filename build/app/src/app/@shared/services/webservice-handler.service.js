"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebserviceHandlerService = void 0;
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let WebserviceHandlerService = class WebserviceHandlerService {
    constructor(http, _message) {
        this.http = http;
        this._message = _message;
        this.httpOptions = {
            headers: new http_1.HttpHeaders({
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token")
                    ? localStorage.getItem("token")
                    : "",
            }),
        };
    }
    GetUnAuth(url) {
        return this.http.get(url).pipe(operators_1.catchError(this.handleError));
    }
    Get(url) {
        return this.http
            .get(url, this.httpOptions)
            .pipe(operators_1.catchError(this.handleError));
    }
    Post(url, para) {
        return this.http
            .post(url, para, this.httpOptions)
            .pipe(operators_1.catchError(this.handleError));
    }
    Put(url, para) {
        return this.http
            .put(url, para, this.httpOptions)
            .pipe(operators_1.catchError(this.handleError));
    }
    Delete(url) {
        return this.http
            .delete(url, this.httpOptions)
            .pipe(operators_1.catchError(this.handleError));
    }
    handleError(error) {
        return rxjs_1.throwError(error);
    }
};
WebserviceHandlerService = __decorate([
    core_1.Injectable({
        providedIn: "root",
    })
], WebserviceHandlerService);
exports.WebserviceHandlerService = WebserviceHandlerService;
//# sourceMappingURL=webservice-handler.service.js.map
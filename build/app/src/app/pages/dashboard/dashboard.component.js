"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardComponent = void 0;
const core_1 = require("@angular/core");
const material_1 = require("@angular/material");
const environment_1 = require("src/environments/environment");
const paginator_1 = require("@angular/material/paginator");
const sort_1 = require("@angular/material/sort");
const api_1 = require("../../@shared/services/api");
let DashboardComponent = class DashboardComponent {
    constructor(_message, _webservice) {
        this._message = _message;
        this._webservice = _webservice;
        this.api = api_1.api;
        this.env = environment_1.environment;
        this.userData = JSON.parse(localStorage.getItem("loginDetail"));
        this.displayedColumns = [
            "dateFirstEvent",
            "idLeague",
            "strSport",
            "strLeague",
            "intDivision",
        ];
        this.dataSource = new material_1.MatTableDataSource([]);
        this.data = [];
        this.sports = [];
        this.countries = [];
        this.players = [];
        this.events = [];
    }
    ngOnInit() {
        this.getData();
        this.getAllSport();
        this.getAllCountries();
        this.getPlayers();
        this.getEvents();
    }
    getData() {
        this._webservice.GetUnAuth(`${this.api.search_all_league}`).subscribe((res) => {
            this.data = res.countries;
            this.setData(this.data);
        }, (err) => {
            this._message.errmessage(err);
        });
    }
    getAllSport() {
        this._webservice.GetUnAuth(`${this.api.all_sports}`).subscribe((res) => {
            this.sports = res.sports;
        }, (err) => {
            this._message.errmessage(err);
        });
    }
    getAllCountries() {
        this._webservice.GetUnAuth(`${this.api.all_countries}`).subscribe((res) => {
            this.countries = res.countries;
        }, (err) => {
            this._message.errmessage(err);
        });
    }
    getPlayers() {
        this._webservice.GetUnAuth(`${this.api.players}`).subscribe((res) => {
            this.players = res.players;
        }, (err) => {
            this._message.errmessage(err);
        });
    }
    getEvents() {
        this._webservice.GetUnAuth(`${this.api.events}`).subscribe((res) => {
            this.events = res.events;
        }, (err) => {
            this._message.errmessage(err);
        });
    }
    applyFilter(filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    setData(data) {
        this.dataSource = new material_1.MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }
};
__decorate([
    core_1.ViewChild(paginator_1.MatPaginator)
], DashboardComponent.prototype, "paginator", void 0);
__decorate([
    core_1.ViewChild(sort_1.MatSort)
], DashboardComponent.prototype, "sort", void 0);
DashboardComponent = __decorate([
    core_1.Component({
        selector: "app-dashboard",
        templateUrl: "./dashboard.component.html",
        styleUrls: ["./dashboard.component.scss"],
    })
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map
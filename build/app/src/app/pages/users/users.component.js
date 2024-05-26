"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersComponent = void 0;
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const environment_1 = require("src/environments/environment");
const material_1 = require("@angular/material");
const api_1 = require("../../@shared/services/api");
let UsersComponent = class UsersComponent {
    constructor(_webservice, dialog, fb, _message) {
        this._webservice = _webservice;
        this.dialog = dialog;
        this.fb = fb;
        this._message = _message;
        this.api = api_1.api;
        this.env = environment_1.environment;
        this.userData = JSON.parse(localStorage.getItem("loginDetail"));
        this.displayedColumns = ["srno", "fn", "un", "email", "action"];
        this.dataSource = new material_1.MatTableDataSource([]);
        this.data = [];
        this.action = "insert";
        this.id = "";
        this.index = 0;
        this.roleArr = this.env.role;
    }
    ngOnInit() {
        this.initForm();
        this.getUsers();
    }
    initForm() {
        this.formGroup = this.fb.group({
            fn: ["", forms_1.Validators.required],
            un: ["", forms_1.Validators.required],
            role: ["", forms_1.Validators.required],
            pwd: [""],
            cpwd: [""],
            email: ["", [forms_1.Validators.email]],
            add: [""],
            action: ["insert", forms_1.Validators.required],
        }, {
            validator: [this.MatchPassword],
        });
    }
    MatchPassword(control) {
        const pwd = control.get("pwd").value.trim();
        const cpwd = control.get("cpwd").value.trim();
        if (pwd && !cpwd) {
            control.get("cpwd").setErrors({ required: true });
        }
        else if (pwd !== cpwd) {
            control.get("cpwd").setErrors({ Confirmpwd: true });
        }
        else {
            control.get("cpwd").setErrors(null);
            return null;
        }
    }
    applyFilter(filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    getUsers() {
        this._webservice.Get(`${this.env.baseUrl + this.api.users}`).subscribe((res) => {
            this.data = res.data;
            this.setData();
        }, (err) => {
            this._message.errmessage(err);
        });
    }
    setData() {
        this.dataSource = new material_1.MatTableDataSource(this.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }
    openDialog(e, status, i) {
        this.action = status;
        let data = {
            fn: e.fn ? e.fn : "",
            un: e.un ? e.un : "",
            role: e.role ? e.role : "",
            pwd: "",
            cpwd: "",
            email: e.email ? e.email : "",
            add: e.add ? e.add : "",
            action: status,
        };
        this.index = i !== -1 ? i : this.data.length;
        this.id = e._id;
        this.formGroup.setValue(data);
        (this.dialogRef = this.dialog.open(this.callDialog)),
            {
                height: "400px",
                width: "600px",
            };
        this.dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
        });
    }
    closeDialog() {
        this.dialogRef.close("callDialog");
    }
    get f() {
        return this.formGroup.controls;
    }
    submit(formGroup) {
        if (formGroup.invalid) {
            return;
        }
        const api = this.action === "insert" ? this.api.signup : this.api.update + this.id;
        const method = this.action === "insert" ? "Post" : "Put";
        delete formGroup.value.action;
        if (this.action === "update") {
            delete formGroup.value.un;
            delete formGroup.value.pwd;
            delete formGroup.value.cpwd;
            delete formGroup.value.role;
        }
        else {
            delete formGroup.value.cpwd;
        }
        this._webservice[method](`${this.env.baseUrl + api}`, formGroup.value).subscribe((res) => {
            this._message.succmessage(res.message);
            this.data[this.index] = res.data;
            this.setData();
            setTimeout(() => {
                this.closeDialog();
            }, 1000);
        }, (err) => {
            this._message.errmessage(err);
        });
    }
};
__decorate([
    core_1.ViewChild(material_1.MatPaginator)
], UsersComponent.prototype, "paginator", void 0);
__decorate([
    core_1.ViewChild(material_1.MatSort)
], UsersComponent.prototype, "sort", void 0);
__decorate([
    core_1.ViewChild("callDialog")
], UsersComponent.prototype, "callDialog", void 0);
UsersComponent = __decorate([
    core_1.Component({
        selector: "app-users",
        templateUrl: "./users.component.html",
        styleUrls: ["./users.component.scss"],
    })
], UsersComponent);
exports.UsersComponent = UsersComponent;
//# sourceMappingURL=users.component.js.map
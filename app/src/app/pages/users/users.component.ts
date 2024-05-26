import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { environment } from "src/environments/environment";
import { MessageService } from "../../@shared/message/message.service";
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog,
} from "@angular/material";
import { WebserviceHandlerService } from "src/app/@shared/services/webservice-handler.service";
import { api } from "../../@shared/services/api";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  public api = api;
  public env = environment;
  public userData = JSON.parse(localStorage.getItem("loginDetail"));

  displayedColumns: string[] = ["srno", "fn", "un", "email", "action"];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("callDialog") callDialog: TemplateRef<any>;
  dialogRef;
  formGroup: FormGroup;
  data = [];
  action = "insert";
  id = "";
  index = 0;
  roleArr = this.env.role;

  constructor(
    protected _webservice: WebserviceHandlerService,
    protected dialog: MatDialog,
    protected fb: FormBuilder,
    protected _message: MessageService
  ) {}

  ngOnInit() {
    this.initForm();
    this.getUsers();
  }

  initForm() {
    this.formGroup = this.fb.group(
      {
        fn: ["", Validators.required],
        un: ["", Validators.required],
        role: ["", Validators.required],
        pwd: [""],
        cpwd: [""],
        email: ["", [Validators.email]],
        add: [""],
        action: ["insert", Validators.required],
      },
      {
        validator: [this.MatchPassword],
      }
    );
  }

  MatchPassword(control: AbstractControl): any {
    const pwd = control.get("pwd").value.trim();
    const cpwd = control.get("cpwd").value.trim();
    if (pwd && !cpwd) {
      control.get("cpwd").setErrors({ required: true });
    } else if (pwd !== cpwd) {
      control.get("cpwd").setErrors({ Confirmpwd: true });
    } else {
      control.get("cpwd").setErrors(null);
      return null;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getUsers() {
    this._webservice.Get(`${this.env.baseUrl + this.api.users}`).subscribe(
      (res) => {
        this.data = res.data;
        this.setData();
      },
      (err) => {
        this._message.errmessage(err);
      }
    );
  }

  setData() {
    this.dataSource = new MatTableDataSource(this.data);
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
    const api =
      this.action === "insert" ? this.api.signup : this.api.update + this.id;
    const method = this.action === "insert" ? "Post" : "Put";
    delete formGroup.value.action;
    if (this.action === "update") {
      delete formGroup.value.un;
      delete formGroup.value.pwd;
      delete formGroup.value.cpwd;
      delete formGroup.value.role;
    } else {
      delete formGroup.value.cpwd;
    }
    this._webservice[method](
      `${this.env.baseUrl + api}`,
      formGroup.value
    ).subscribe(
      (res) => {
        this._message.succmessage(res.message);
        this.data[this.index] = res.data;
        this.setData();
        setTimeout(() => {
          this.closeDialog();
        }, 1000);
      },
      (err) => {
        this._message.errmessage(err);
      }
    );
  }
}

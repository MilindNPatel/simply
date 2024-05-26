import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormControl,
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { environment } from "src/environments/environment";
import { MessageService } from "../../@shared/message/message.service";
import { api } from "../../@shared/services/api";
import { WebserviceHandlerService } from "src/app/@shared/services/webservice-handler.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  env = environment;
  api = api;
  constructor(
    protected _webservice: WebserviceHandlerService,
    protected _message: MessageService,
    protected fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      un: ["", Validators.required],
      pwd: ["", Validators.required],
    });
  }

  onLogin(formGroup) {
    if (formGroup.invalid) {
      this.router.navigate(["/dashboard"]);
      return;
    }
    this._webservice
      .Post(`${this.env.baseUrl + this.api.login}`, formGroup.value)
      .subscribe(
        (res) => {
          if (res) {
            localStorage.setItem("token", `jwt ${res.authToken}`);
            localStorage.setItem("user", JSON.stringify(res));
            this.router.navigate(["/dashboard"]);
          }
          this._message.succmessage(res.message);
        },
        (err) => {
          this._message.errmessage(err);
        }
      );
  }
}

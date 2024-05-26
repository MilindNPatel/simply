import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class MessageService {
  constructor(private _snackBar: MatSnackBar, private router: Router) {}

  errmessage(err) {
    if (err.status == 401) {
      this.succmessage(err.error);
      this.router.navigate(["/login"]);
    } else if (err.status == 400) {
      let error = err.error.message;
      this.succmessage(error);
    }
  }

  succmessage(msg) {
    this._snackBar.open(msg, "", {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }
}

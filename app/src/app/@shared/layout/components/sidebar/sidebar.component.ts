import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../../auth/guard/auth.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public showMenu: string;
  public currentUser: Object;
  constructor(private authService: AuthService) {
    this.authService.currentUser.subscribe((res) => {
      this.currentUser = res;
    });
  }

  ngOnInit() {
    this.showMenu = "";
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = "0";
    } else {
      this.showMenu = element;
    }
  }

  get isAdmin() {
    return this.currentUser && this.currentUser["role"] === 2;
  }
}

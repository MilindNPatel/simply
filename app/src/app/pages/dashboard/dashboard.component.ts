import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { environment } from "src/environments/environment";
import { MessageService } from "../../@shared/message/message.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { WebserviceHandlerService } from "src/app/@shared/services/webservice-handler.service";
import { api } from "../../@shared/services/api";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public api = api;
  public env = environment;
  public userData = JSON.parse(localStorage.getItem("loginDetail"));

  displayedColumns: string[] = [
    "dateFirstEvent",
    "idLeague",
    "strSport",
    "strLeague",
    "intDivision",
  ];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  data: any = [];
  sports: any = [];
  countries: any = [];
  players: any = [];
  events: any = [];

  constructor(
    protected _message: MessageService,
    protected _webservice: WebserviceHandlerService
  ) {}

  ngOnInit() {
    this.getData();
    this.getAllSport();
    this.getAllCountries();
    this.getPlayers();
    this.getEvents();
  }

  getData() {
    this._webservice.GetUnAuth(`${this.api.search_all_league}`).subscribe(
      (res) => {
        this.data = res.countries;
        this.setData(this.data);
      },
      (err) => {
        this._message.errmessage(err);
      }
    );
  }

  getAllSport() {
    this._webservice.GetUnAuth(`${this.api.all_sports}`).subscribe(
      (res) => {
        this.sports = res.sports;
      },
      (err) => {
        this._message.errmessage(err);
      }
    );
  }

  getAllCountries() {
    this._webservice.GetUnAuth(`${this.api.all_countries}`).subscribe(
      (res) => {
        this.countries = res.countries;
      },
      (err) => {
        this._message.errmessage(err);
      }
    );
  }

  getPlayers() {
    this._webservice.GetUnAuth(`${this.api.players}`).subscribe(
      (res) => {
        this.players = res.players;
      },
      (err) => {
        this._message.errmessage(err);
      }
    );
  }

  getEvents() {
    this._webservice.GetUnAuth(`${this.api.events}`).subscribe(
      (res) => {
        this.events = res.events;
      },
      (err) => {
        this._message.errmessage(err);
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setData(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}

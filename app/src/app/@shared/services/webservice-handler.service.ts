import { Injectable } from "@angular/core";
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from "@angular/common/http";
import { MessageService } from "../message/message.service";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class WebserviceHandlerService {
  public httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
        ? localStorage.getItem("token")
        : "",
    }),
  };
  constructor(protected http: HttpClient, protected _message: MessageService) {}

  GetUnAuth(url): Observable<any> {
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  Get(url): Observable<any> {
    return this.http
      .get(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  Post(url, para): Observable<any> {
    return this.http
      .post(url, para, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  Put(url: any, para: any): Observable<any> {
    return this.http
      .put(url, para, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  Delete(url: any): Observable<any> {
    return this.http
      .delete(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}

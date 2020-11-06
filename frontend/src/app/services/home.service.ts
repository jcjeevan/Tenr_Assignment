import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, first } from "rxjs/operators";
import { User } from "../models/User";
import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
  providedIn: "root",
})
export class HomeService {
  private url = "http://localhost:3000/home";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAll() {
    return this.http.get(this.url, { responseType: "json" }).pipe(
        catchError(this.errorHandlerService.handleError("fetchAll", []))
      );
  }

}

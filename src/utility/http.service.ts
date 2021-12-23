import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { LocalStorageService } from "./local-storage.service";
import { SessionStorageService } from './session-storage.service';
@Injectable()
export class HttpService {
  httpOptions: any;
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
    private sessionStorage: SessionStorageService,
  ) {
    this.updateHeader();
  }

  updateHeader() {
    let user = this.localStorage.get("user");

    if(!user){
      user = this.sessionStorage.get("user");
    }

    let token = null;

    if (user) {
      const info = JSON.parse(user);
      token = info.token;
    }

    if (token) {
      this.httpOptions = {
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
        // 'Content-Type': 'multipart/form-data; boundary=----border----',
        Authorization: `Barear ${token}`
      };
    } else {
      this.httpOptions = {
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
        // "Content-Type": "application/json; charset=utf-8"
      };
    }
  }

  get(url) {
    return this.http.get(environment.API_URL + url, {
      headers: this.httpOptions
    });
  }

  post(url, body) {
    return this.http.post(environment.API_URL + url, body, {
      headers: this.httpOptions,
      responseType: "json"
    });
  }

  upload(url, body){
    return this.http.post(environment.API_URL + url, body, {
      headers: this.httpOptions,
      responseType: "json",
      reportProgress: true, 
      observe: 'events'
    });
  }

  put(url, body) {
    return this.http.put(environment.API_URL + url, body, {
      headers: this.httpOptions,
      responseType: "json"
    });
  }

  delete(url) {
    return this.http.delete(environment.API_URL + url, {
      headers: this.httpOptions
    });
  }
}

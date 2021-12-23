import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { LocalStorageService } from "./local-storage.service";
import { SessionStorageService } from "./session-storage.service";

@Injectable({
  providedIn: "root"
})
export class SubscribableService {
  constructor(
    
    private httpService: HttpService,
    private localStorage: LocalStorageService,
    private sessionStorage: SessionStorageService
  ) {}

  hasRefreshToken() {
    const info = this.getInfo();

    if (info.refreshToken) {
      return true;
    }
    return false;
  }

  getInfo() {
    let info = this.localStorage.get("user");

    if (!info) {
      info = this.sessionStorage.get("user");
    }

    if (info) {
      return JSON.parse(info);
    } else {
      return null;
    }
  }

  refreshToken() : Observable<any>{
    const info = this.getInfo();
    return this.httpService.post(`v1/token/refresh`, {
      refreshToken: info.refreshToken
    });
  }

  updateToken(token, refreshToken) {
    let info = this.getInfo();
    info.token = token;
    info.refreshToken = refreshToken;
    if (info.rememberMe) {
      this.localStorage.set("user", JSON.stringify(info));
    } else {
      this.sessionStorage.set("user", JSON.stringify(info));
    }
    this.httpService.updateHeader();
  }
}

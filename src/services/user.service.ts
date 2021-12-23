import { BROADCAST_KEYS } from "./../constants/broadcast.keys";
import { BroadcastService } from "./../utility/broadcast.service";
import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { HttpService } from "src/utility/http.service";
import { LocalStorageService } from "src/utility/local-storage.service";
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { environment } from "src/environments/environment";
import { SessionStorageService } from "src/utility/session-storage.service";
declare var FB: any;
declare var firebase: any;
@Injectable({
  providedIn: "root"
})
export class UserService {
  isBrowser = false;
  constructor(
    private httpService: HttpService,
    private localStorage: LocalStorageService,
    private sessionStorage: SessionStorageService,
    private broadcastService: BroadcastService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    
  }

  login(body) {
    return this.httpService.post(`v1/auth`, body);
  }

  signup(body){
    return this.httpService.post(`v1/user`, body);

  }

  getUsers(){
    return this.httpService.get(`v1/User/users`);
  }

  getFbAccessToken(success, error) {
    FB.getLoginStatus(response => {
      if (response.status === "connected") {
        success(response.authResponse.accessToken);
      } else {
        FB.login(response => {
          if (response.authResponse) {
            success(response.authResponse.accessToken);
          }
        });
      }
    });
    error(true);
  }

  isLoggedIntoFb(loggedIn) {
    FB.getLoginStatus(response => {
      if (response.status === "connected") {
        loggedIn(true);
      } else {
        loggedIn(false);
      }
    });
  }

  getGoogleAccessToken(success, error) {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        ;
        success(result.user);
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }

  loginWithFacebook(body) {
    return this.httpService.post(`v1/auth/facebook`, body);
  }

  loginWithGoogle(body) {
    return this.httpService.post(`v1/auth/google`, body);
  }

  isLoggedIn() {
    const user = this.getUserInfo();
    return user != null && user != undefined;
  }

  logout() {
    this.localStorage.remove("user");
    this.sessionStorage.remove("user");
    this.localStorage.remove("nowPlaying");
    this.localStorage.remove("next");
    this.localStorage.remove("prev");
    this.localStorage.remove("queue");
    this.localStorage.remove("customQueue");
    this.localStorage.remove("queueIndex");
    this.httpService.updateHeader();

    this.isLoggedIntoFb(isLoggedIn => {
      if (isLoggedIn) {
        FB.logout(response => {
        });
      }
    });

    this.broadcastService.broadcast(BROADCAST_KEYS.USER_LOGGED_OUT);
  }

  setUserInfo(info) {
    this.localStorage.remove("user");
    this.sessionStorage.remove("user");

    if (info.rememberMe) {
      this.localStorage.set("user", JSON.stringify(info));
    } else {
      this.sessionStorage.set("user", JSON.stringify(info));
    }
    this.httpService.updateHeader();
    this.broadcastService.broadcast(BROADCAST_KEYS.USER_LOGGED_IN);
  }

  getInfo(userId){
    return this.httpService.get(`v1/user/${userId}`);

  }

  getUserInfo() {
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

  register(body) {
    return this.httpService.post(`v1/user/register`, body);
  }

  isRegistered(email) {
    return this.httpService.post(`v1/user/registered`, { email: email });
  }

  verify(body) {
    return this.httpService.post(`v1/user/verify`, body);
  }

  resend(body) {
    return this.httpService.post(`v1/user/resend`, body);
  }
}

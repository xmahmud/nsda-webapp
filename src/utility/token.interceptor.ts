import { SubscribableService } from "src/utility/subscribable.service";
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import {
  tap,
  catchError,
  switchMap,
  finalize,
  filter,
  take
} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TokenInterceptor implements HttpInterceptor {
  private isTokenRefreshing: boolean = false;

  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private acct: SubscribableService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(this.attachTokenToRequest(request)).pipe(
      catchError(
        (err): Observable<any> => {
          if (err instanceof HttpErrorResponse) {
            switch ((<HttpErrorResponse>err).status) {
              case 401:
                console.log("Token expired. Attempting refresh ...");
                return this.handleHttpResponseError(request, next);
              default:
                return throwError(this.handleError);
            }
          } else {
            return throwError(this.handleError);
          }
        }
      )
    );
  }

  // Global error handler method
  private handleError(errorResponse: HttpErrorResponse) {
    let errorMsg = "An error occured";

    if (errorResponse && errorResponse.error instanceof Error) {
      errorMsg = "An error occured : " + errorResponse.error.message;
    } else {
      errorMsg = `Backend returned code ${errorResponse.status}, body was: ${errorResponse.error}`;
    }

    return throwError(errorMsg);
  }

  // Method to handle http error response
  private handleHttpResponseError(
    request: HttpRequest<any>,
    next: HttpHandler
  ) {
    let info = this.acct.getInfo();
    // First thing to check if the token is in process of refreshing
    if (!this.isTokenRefreshing) {
      if (info && info.token && info.refreshToken) {
        // If the Token Refresheing is not true
        this.isTokenRefreshing = true;

        // Any existing value is set to null
        // Reset here so that the following requests wait until the token comes back from the refresh token API call
        this.tokenSubject.next(null);

        /// call the API to refresh the token
        return this.acct.refreshToken().pipe(
          switchMap((tokenresponse: any) => {
            if (tokenresponse) {
              this.tokenSubject.next(tokenresponse.token);
              this.acct.updateToken(
                tokenresponse.token,
                tokenresponse.refreshToken
              );
              console.log("Token refreshed...");
              return next.handle(this.attachTokenToRequest(request));
            }
            return throwError(this.handleError);
          }),
          catchError(err => {
            //this.acct.logout();
            return this.handleError(err);
          }),
          finalize(() => {
            this.isTokenRefreshing = false;
          })
        );
      } else {
        return throwError("You are not authorized.");
      }
    } else {
      this.isTokenRefreshing = false;
      return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          return next.handle(this.attachTokenToRequest(request));
        })
      );
    }
  }

  private attachTokenToRequest(request: HttpRequest<any>) {
    var info = this.acct.getInfo();
    request.headers.delete("Content-Type");
    if (info && info.token) {
      return request.clone({
        setHeaders: {
          Accept: "*/*",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${info.token}`
        }
      });
    } else {
      return request.clone({
        setHeaders: {
          Accept: "*/*",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
  }
}

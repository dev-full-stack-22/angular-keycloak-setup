import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly oAuthService: OAuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const accessToken = this.oAuthService.getAccessToken();

    if (accessToken) {
      // Clone the request and replace the original headers with
      // cloned headers, updated with the authorization.

      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + accessToken),
      });

      // send cloned request with header to the next handler.
      // return next.handle(authReq);
      return next.handle(authReq).pipe(
        catchError((err) => {
          if (err.status === 401 || err.status === 403) {
            this.oAuthService.logOut();
          }
          const error = err.error.message || err.statusText;
          return throwError(error);
        })
      );
    } else {
      console.log('application not logged in. No access token');

      // send cloned request with header to the next handler.
      return next.handle(req);
    }
  }
}

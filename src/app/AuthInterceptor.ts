import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly oAuthService: OAuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const accessToken = this.oAuthService.getAccessToken();
    console.log('accessToken: ', accessToken);

    if (accessToken) {
      // Clone the request and replace the original headers with
      // cloned headers, updated with the authorization.
      console.log('added access token in headers');

      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + accessToken),
      });

      // send cloned request with header to the next handler.
      return next.handle(authReq);
    } else {
      console.log('application not logged in. No access token');

      // send cloned request with header to the next handler.
      return next.handle(req);
    }
  }
}

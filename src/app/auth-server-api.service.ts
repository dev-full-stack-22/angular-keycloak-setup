import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Subject } from 'rxjs';

const oAuthConfig: AuthConfig = {
  issuer: 'http://localhost:8081/realms/Demo-Realm',
  strictDiscoveryDocumentValidation: false,
  //to be true in production
  redirectUri: window.location.origin,
  clientId: 'springboot-microservice',
  dummyClientSecret: 'T4pDjc6K1AMiPgH3UXoByoSrccGDqKD5',
  scope: 'openid',
};

export interface UserInfo {
  info: {
    sub: string;
    email: string;
    name: string;
    picture: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthServerApiService {
  userProfileSubject = new Subject<UserInfo>();

  constructor(private readonly oAuthService: OAuthService) {
    oAuthService.configure(oAuthConfig);
    oAuthService.loadDiscoveryDocument().then(() => {
      console.log('load discovery document');
      oAuthService.tryLoginImplicitFlow().then(() => {
        console.log('try login implict flow');
        if (!oAuthService.hasValidAccessToken()) {
          console.log('does not have valid acess token');
          oAuthService.initLoginFlow();
        } else {
          console.log('Contains valid access token');
          oAuthService.loadUserProfile().then((userProfile) => {
            console.log(JSON.stringify(userProfile));
            this.userProfileSubject.next(userProfile as UserInfo);
          });
        }
      });
    });
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  signOut() {
    this.oAuthService.logOut();
  }
}

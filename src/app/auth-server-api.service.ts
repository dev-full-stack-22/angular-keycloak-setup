import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService, UserInfo } from 'angular-oauth2-oidc';
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

@Injectable({
  providedIn: 'root',
})
export class AuthServerApiService {
  userProfileSubject = new Subject<UserInfo>();

  userRolesSubject = new Subject<string[]>();

  userInfo?: UserInfo;
  roles?: string[];

  constructor(private readonly oAuthService: OAuthService) {
    console.log('OAuthService constructor');
    oAuthService.configure(oAuthConfig);
    oAuthService.loadDiscoveryDocument().then(() => {
      console.log('load discovery document');
      oAuthService.tryLoginImplicitFlow().then(() => {
        console.log('try login implict flow');
        console.log(
          'has valid acceess token: ',
          oAuthService.hasValidAccessToken()
        );
        if (!oAuthService.hasValidAccessToken()) {
          console.log('does not have valid acess token');
          oAuthService.initLoginFlow();
        } else {
          console.log('Contains valid access token');
          oAuthService.loadUserProfile().then((userProfile) => {
            console.log('userProfile: ', JSON.stringify(userProfile));
            this.userProfileSubject.next(userProfile as UserInfo);
            this.userInfo = userProfile as UserInfo;
            //load the roles that are applicable to the logged in user
            this._loadLoggedInUserRoles();
          });
        }
      });
    });
  }

  getDecodedJwtData() {
    let jwt = this.oAuthService.getAccessToken();
    let jwtData = jwt.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    return JSON.parse(decodedJwtJsonData);
  }

  getRoles() {
    let decodedJwtData = this.getDecodedJwtData();
    let roles =
      decodedJwtData['resource_access']['springboot-microservice']['roles'];
    return roles;
  }

  _loadLoggedInUserRoles() {
    this.roles = this.getRoles();
    console.log('roles: ', this.roles);
    this.userRolesSubject.next(this.roles as string[]);
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  signOut() {
    this.oAuthService.logOut();
  }
}

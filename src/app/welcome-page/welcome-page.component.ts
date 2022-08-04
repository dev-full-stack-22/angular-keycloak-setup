import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'angular-oauth2-oidc';
import { AuthServerApiService } from '../auth-server-api.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  userInfo?: UserInfo;

  jwtToken?: string;

  roles?: string;

  constructor(private authApiServer: AuthServerApiService) {
    this.authApiServer.userProfileSubject.subscribe((info) => {
      this.userInfo = info;
      console.log('welcome page userInfo: ', info);
    });
  }

  ngOnInit(): void {
    console.log('welcome page init');
    this.userInfo = this.authApiServer.userInfo;
    console.log('welcome page init exit');
  }

  showAccessToken() {
    this.jwtToken = this.authApiServer.getDecodedJwtData();
    console.log('jwtToken: ', this.jwtToken);
    this.roles = this.authApiServer.getRoles();
    console.log('roles: ', this.roles);
  }
}

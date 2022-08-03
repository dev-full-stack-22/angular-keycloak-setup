import { Component } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { AuthServerApiService, UserInfo } from './auth-server-api.service';
import { BackendServiceService } from './backend-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'demo-ui';

  userInfo?: UserInfo;

  userText: string = '';

  constructor(
    private readonly authApiServer: AuthServerApiService,
    private backendService: BackendServiceService
  ) {
    authApiServer.userProfileSubject.subscribe((info) => {
      this.userInfo = info;
    });
  }

  getUserText() {
    console.log('get user text');
    this.backendService
      .getUserText()
      .pipe(
        finalize(() => {
          console.log('inside finalize');
        }),
        catchError((error) => {
          console.log('error: ', error);
          return throwError(error);
        })
      )
      .subscribe((out) => {
        console.log('out: ', out);
        this.userText = out;
      });
  }

  isLoggedIn() {
    return this.authApiServer.isLoggedIn();
  }

  logOut() {
    this.authApiServer.signOut();
  }
}

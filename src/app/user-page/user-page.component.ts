import { Component, OnInit } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { BackendServiceService } from '../backend-service.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  constructor(private readonly backendService: BackendServiceService) {}

  userText?: string;

  ngOnInit(): void {
    this.getUserText();
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
}

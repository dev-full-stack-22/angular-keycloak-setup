import { Component, OnInit } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { BackendServiceService } from '../backend-service.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  constructor(private readonly backendService: BackendServiceService) {}

  adminText?: string;

  ngOnInit(): void {
    this.getAdminText();
  }

  getAdminText() {
    console.log('get user text');
    this.backendService
      .getAdminText()
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
        this.adminText = out;
      });
  }
}

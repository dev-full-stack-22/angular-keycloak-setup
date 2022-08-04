import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendServiceService {
  constructor(private readonly httpClient: HttpClient) {}

  public getUserText(): Observable<any> {
    return this.httpClient.get('http://localhost:8000/test/user', {
      responseType: 'text',
    });
  }

  public getAdminText(): Observable<any> {
    return this.httpClient.get('http://localhost:8000/test/admin', {
      responseType: 'text',
    });
  }
}

import { TestBed } from '@angular/core/testing';

import { AuthServerApiService } from './auth-server-api.service';

describe('AuthServerApiService', () => {
  let service: AuthServerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthServerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

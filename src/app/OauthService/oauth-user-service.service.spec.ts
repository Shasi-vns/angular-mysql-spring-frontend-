import { TestBed } from '@angular/core/testing';

import { OauthUserServiceService } from './oauth-user-service.service';

describe('OauthUserServiceService', () => {
  let service: OauthUserServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OauthUserServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

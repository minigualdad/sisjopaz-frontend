import { TestBed } from '@angular/core/testing';

import { AccountCertLogService } from './account-cert-log.service';

describe('AccountCertLogService', () => {
  let service: AccountCertLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountCertLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

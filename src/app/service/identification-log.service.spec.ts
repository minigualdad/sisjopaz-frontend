import { TestBed } from '@angular/core/testing';

import { IdentificationLogService } from './identification-log.service';

describe('IdentificationLogService', () => {
  let service: IdentificationLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdentificationLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

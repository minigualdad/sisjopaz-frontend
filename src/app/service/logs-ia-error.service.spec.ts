import { TestBed } from '@angular/core/testing';

import { LogsIaErrorService } from './logs-ia-error.service';

describe('LogsIaErrorService', () => {
  let service: LogsIaErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogsIaErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

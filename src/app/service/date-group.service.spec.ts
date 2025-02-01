import { TestBed } from '@angular/core/testing';

import { DateGroupService } from './date-group.service';

describe('DateGroupService', () => {
  let service: DateGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

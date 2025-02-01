import { TestBed } from '@angular/core/testing';

import { DateGroupCalendarService } from './date-group-calendar.service';

describe('DateGroupCalendarService', () => {
  let service: DateGroupCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateGroupCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

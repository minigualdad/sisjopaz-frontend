import { TestBed } from '@angular/core/testing';

import { GroupScheduleService } from './group-schedule.service';

describe('GroupScheduleService', () => {
  let service: GroupScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

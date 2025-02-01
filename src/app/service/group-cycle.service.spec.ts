import { TestBed } from '@angular/core/testing';

import { GroupCycleService } from './group-cycle.service';

describe('GroupCycleService', () => {
  let service: GroupCycleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupCycleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

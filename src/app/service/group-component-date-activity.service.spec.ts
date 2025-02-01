import { TestBed } from '@angular/core/testing';

import { GroupComponentDateActivityService } from './group-component-date-activity.service';

describe('GroupComponentDateActivityService', () => {
  let service: GroupComponentDateActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupComponentDateActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

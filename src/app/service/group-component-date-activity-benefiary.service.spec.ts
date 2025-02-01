import { TestBed } from '@angular/core/testing';

import { GroupComponentDateActivityBenefiaryService } from './group-component-date-activity-benefiary.service';

describe('GroupComponentDateActivityBenefiaryService', () => {
  let service: GroupComponentDateActivityBenefiaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupComponentDateActivityBenefiaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

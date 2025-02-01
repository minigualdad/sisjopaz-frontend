import { TestBed } from '@angular/core/testing';

import { GroupScheduleBeneficiaryService } from './group-schedule-beneficiary.service';

describe('GroupScheduleBeneficiaryService', () => {
  let service: GroupScheduleBeneficiaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupScheduleBeneficiaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

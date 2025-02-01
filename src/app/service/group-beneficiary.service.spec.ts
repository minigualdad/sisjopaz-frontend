import { TestBed } from '@angular/core/testing';

import { GroupBeneficiaryService } from './group-beneficiary.service';

describe('GroupBeneficiaryService', () => {
  let service: GroupBeneficiaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupBeneficiaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

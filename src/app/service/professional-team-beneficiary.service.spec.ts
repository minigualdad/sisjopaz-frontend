import { TestBed } from '@angular/core/testing';

import { ProfessionalTeamBeneficiaryService } from './professional-team-beneficiary.service';

describe('ProfessionalTeamBeneficiaryService', () => {
  let service: ProfessionalTeamBeneficiaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessionalTeamBeneficiaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

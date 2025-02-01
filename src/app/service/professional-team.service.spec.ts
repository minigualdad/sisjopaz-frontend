import { TestBed } from '@angular/core/testing';

import { ProfessionalTeamService } from './professional-team.service';

describe('ProfessionalTeamService', () => {
  let service: ProfessionalTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessionalTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

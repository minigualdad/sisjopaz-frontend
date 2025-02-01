import { TestBed } from '@angular/core/testing';

import { GroupProfessionalTeamService } from './group-professional-team.service';

describe('GroupProfessionalTeamService', () => {
  let service: GroupProfessionalTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupProfessionalTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

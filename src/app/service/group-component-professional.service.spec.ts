import { TestBed } from '@angular/core/testing';

import { GroupComponentProfessionalService } from './group-component-professional.service';

describe('GroupComponentProfessionalService', () => {
  let service: GroupComponentProfessionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupComponentProfessionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

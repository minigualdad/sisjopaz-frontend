import { TestBed } from '@angular/core/testing';

import { CharacterizationService } from './characterization.service';

describe('CharacterizationService', () => {
  let service: CharacterizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

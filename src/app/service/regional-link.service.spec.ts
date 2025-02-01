import { TestBed } from '@angular/core/testing';

import { RegionalLinkService } from './regional-link.service';

describe('RegionalLinkService', () => {
  let service: RegionalLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegionalLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

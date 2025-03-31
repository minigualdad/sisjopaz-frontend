import { TestBed } from '@angular/core/testing';

import { AssistanceGeneratesService } from './assistance-generates.service';

describe('AssistanceGeneratesService', () => {
  let service: AssistanceGeneratesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssistanceGeneratesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

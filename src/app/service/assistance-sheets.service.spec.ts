import { TestBed } from '@angular/core/testing';

import { AssistanceSheetsService } from './assistance-sheets.service';

describe('AssistanceSheetsService', () => {
  let service: AssistanceSheetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssistanceSheetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AssistanceScannerBeneficiaryService } from './assistance-scanner-beneficiary.service';

describe('AssistanceScannerBeneficiaryService', () => {
  let service: AssistanceScannerBeneficiaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssistanceScannerBeneficiaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

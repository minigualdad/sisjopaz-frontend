import { TestBed } from '@angular/core/testing';

import { DivipolService } from './divipol.service';

describe('DivipolService', () => {
  let service: DivipolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DivipolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

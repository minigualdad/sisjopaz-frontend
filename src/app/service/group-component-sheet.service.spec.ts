import { TestBed } from '@angular/core/testing';

import { GroupComponentSheetService } from './group-component-sheet.service';

describe('GroupComponentSheetService', () => {
  let service: GroupComponentSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupComponentSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

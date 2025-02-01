import { TestBed } from '@angular/core/testing';

import { GroupComponentService } from './group-component.service';

describe('GroupComponentService', () => {
  let service: GroupComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

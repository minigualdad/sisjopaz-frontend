import { TestBed } from '@angular/core/testing';

import { DocumentSurveyService } from './document-survey.service';

describe('DocumentSurveyService', () => {
  let service: DocumentSurveyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentSurveyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

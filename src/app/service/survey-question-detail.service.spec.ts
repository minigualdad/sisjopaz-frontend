import { TestBed } from '@angular/core/testing';

import { SurveyQuestionDetailService } from './survey-question-detail.service';

describe('SurveyQuestionDetailService', () => {
  let service: SurveyQuestionDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyQuestionDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

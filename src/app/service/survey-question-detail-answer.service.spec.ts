import { TestBed } from '@angular/core/testing';

import { SurveyQuestionDetailAnswerService } from './survey-question-detail-answer.service';

describe('SurveyQuestionDetailAnswerService', () => {
  let service: SurveyQuestionDetailAnswerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyQuestionDetailAnswerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

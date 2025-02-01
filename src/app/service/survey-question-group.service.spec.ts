import { TestBed } from '@angular/core/testing';

import { SurveyQuestionGroupService } from './survey-question-group.service';

describe('SurveyQuestionGroupService', () => {
  let service: SurveyQuestionGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyQuestionGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

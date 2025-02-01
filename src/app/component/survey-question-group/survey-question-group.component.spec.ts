import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyQuestionGroupComponent } from './survey-question-group.component';

describe('SurveyQuestionGroupComponent', () => {
  let component: SurveyQuestionGroupComponent;
  let fixture: ComponentFixture<SurveyQuestionGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyQuestionGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyQuestionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

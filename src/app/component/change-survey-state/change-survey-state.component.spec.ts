import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSurveyStateComponent } from './change-survey-state.component';

describe('ChangeSurveyStateComponent', () => {
  let component: ChangeSurveyStateComponent;
  let fixture: ComponentFixture<ChangeSurveyStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeSurveyStateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeSurveyStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

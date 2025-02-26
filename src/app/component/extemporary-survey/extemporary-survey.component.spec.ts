import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtemporarySurveyComponent } from './extemporary-survey.component';

describe('ExtemporarySurveyComponent', () => {
  let component: ExtemporarySurveyComponent;
  let fixture: ComponentFixture<ExtemporarySurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtemporarySurveyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtemporarySurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyMassiveArnComponent } from './survey-massive-arn.component';

describe('SurveyMassiveArnComponent', () => {
  let component: SurveyMassiveArnComponent;
  let fixture: ComponentFixture<SurveyMassiveArnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyMassiveArnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyMassiveArnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

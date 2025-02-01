import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyMassiveDpsComponent } from './survey-massive-dps.component';

describe('SurveyMassiveDpsComponent', () => {
  let component: SurveyMassiveDpsComponent;
  let fixture: ComponentFixture<SurveyMassiveDpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyMassiveDpsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyMassiveDpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

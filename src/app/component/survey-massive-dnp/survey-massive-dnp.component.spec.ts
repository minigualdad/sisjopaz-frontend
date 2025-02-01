import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyMassiveDnpComponent } from './survey-massive-dnp.component';

describe('SurveyMassiveDnpComponent', () => {
  let component: SurveyMassiveDnpComponent;
  let fixture: ComponentFixture<SurveyMassiveDnpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyMassiveDnpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyMassiveDnpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

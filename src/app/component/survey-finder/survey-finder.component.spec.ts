import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyFinderComponent } from './survey-finder.component';

describe('SurveyFinderComponent', () => {
  let component: SurveyFinderComponent;
  let fixture: ComponentFixture<SurveyFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyFinderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

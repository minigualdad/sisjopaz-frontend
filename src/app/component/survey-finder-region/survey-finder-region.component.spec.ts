import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyFinderRegionComponent } from './survey-finder-region.component';

describe('SurveyFinderRegionComponent', () => {
  let component: SurveyFinderRegionComponent;
  let fixture: ComponentFixture<SurveyFinderRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyFinderRegionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyFinderRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

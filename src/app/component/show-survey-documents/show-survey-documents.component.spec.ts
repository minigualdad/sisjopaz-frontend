import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSurveyDocumentsComponent } from './show-survey-documents.component';

describe('ShowSurveyDocumentsComponent', () => {
  let component: ShowSurveyDocumentsComponent;
  let fixture: ComponentFixture<ShowSurveyDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowSurveyDocumentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowSurveyDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

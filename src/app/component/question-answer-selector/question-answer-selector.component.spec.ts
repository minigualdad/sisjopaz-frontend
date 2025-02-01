import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAnswerSelectorComponent } from './question-answer-selector.component';

describe('QuestionAnswerSelectorComponent', () => {
  let component: QuestionAnswerSelectorComponent;
  let fixture: ComponentFixture<QuestionAnswerSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionAnswerSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionAnswerSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

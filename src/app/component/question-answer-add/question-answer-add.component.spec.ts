import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAnswerAddComponent } from './question-answer-add.component';

describe('QuestionAnswerAddComponent', () => {
  let component: QuestionAnswerAddComponent;
  let fixture: ComponentFixture<QuestionAnswerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionAnswerAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionAnswerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

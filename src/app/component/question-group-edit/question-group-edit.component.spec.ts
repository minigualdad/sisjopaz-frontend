import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGroupEditComponent } from './question-group-edit.component';

describe('QuestionGroupEditComponent', () => {
  let component: QuestionGroupEditComponent;
  let fixture: ComponentFixture<QuestionGroupEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionGroupEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

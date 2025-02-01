import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGroupAddComponent } from './question-group-add.component';

describe('QuestionGroupAddComponent', () => {
  let component: QuestionGroupAddComponent;
  let fixture: ComponentFixture<QuestionGroupAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionGroupAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionGroupAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

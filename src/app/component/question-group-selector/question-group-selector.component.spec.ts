import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGroupSelectorComponent } from './question-group-selector.component';

describe('QuestionGroupSelectorComponent', () => {
  let component: QuestionGroupSelectorComponent;
  let fixture: ComponentFixture<QuestionGroupSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionGroupSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionGroupSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

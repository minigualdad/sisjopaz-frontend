import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistanceByMonthComponent } from './assistance-by-month.component';

describe('AssistanceByMonthComponent', () => {
  let component: AssistanceByMonthComponent;
  let fixture: ComponentFixture<AssistanceByMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistanceByMonthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistanceByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

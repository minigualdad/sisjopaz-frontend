import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistanceTableScheduleComponent } from './assistance-table-schedule.component';

describe('AssistanceTableScheduleComponent', () => {
  let component: AssistanceTableScheduleComponent;
  let fixture: ComponentFixture<AssistanceTableScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistanceTableScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistanceTableScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

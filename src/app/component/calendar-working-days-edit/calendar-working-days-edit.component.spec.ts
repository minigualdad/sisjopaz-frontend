import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarWorkingDaysEditComponent } from './calendar-working-days-edit.component';

describe('CalendarWorkingDaysEditComponent', () => {
  let component: CalendarWorkingDaysEditComponent;
  let fixture: ComponentFixture<CalendarWorkingDaysEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarWorkingDaysEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarWorkingDaysEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

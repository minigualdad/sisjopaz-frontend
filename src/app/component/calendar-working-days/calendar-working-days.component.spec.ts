import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarWorkingDaysComponent } from './calendar-working-days.component';

describe('CalendarWorkingDaysComponent', () => {
  let component: CalendarWorkingDaysComponent;
  let fixture: ComponentFixture<CalendarWorkingDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarWorkingDaysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarWorkingDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

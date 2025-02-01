import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarWorkingDaysAddComponent } from './calendar-working-days-add.component';

describe('CalendarWorkingDaysAddComponent', () => {
  let component: CalendarWorkingDaysAddComponent;
  let fixture: ComponentFixture<CalendarWorkingDaysAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarWorkingDaysAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarWorkingDaysAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

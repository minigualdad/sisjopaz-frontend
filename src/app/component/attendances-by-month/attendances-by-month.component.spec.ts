import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendancesByMonthComponent } from './attendances-by-month.component';

describe('AttendancesByMonthComponent', () => {
  let component: AttendancesByMonthComponent;
  let fixture: ComponentFixture<AttendancesByMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendancesByMonthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendancesByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

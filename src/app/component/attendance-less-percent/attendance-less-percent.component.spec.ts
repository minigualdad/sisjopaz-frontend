import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceLessPercentComponent } from './attendance-less-percent.component';

describe('AttendanceLessPercentComponent', () => {
  let component: AttendanceLessPercentComponent;
  let fixture: ComponentFixture<AttendanceLessPercentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceLessPercentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceLessPercentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

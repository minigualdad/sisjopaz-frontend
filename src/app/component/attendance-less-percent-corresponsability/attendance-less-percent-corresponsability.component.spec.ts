import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceLessPercentCorresponsabilityComponent } from './attendance-less-percent-corresponsability.component';

describe('AttendanceLessPercentCorresponsabilityComponent', () => {
  let component: AttendanceLessPercentCorresponsabilityComponent;
  let fixture: ComponentFixture<AttendanceLessPercentCorresponsabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceLessPercentCorresponsabilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceLessPercentCorresponsabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

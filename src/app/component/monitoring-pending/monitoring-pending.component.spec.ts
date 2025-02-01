import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringPendingComponent } from './monitoring-pending.component';

describe('MonitoringPendingComponent', () => {
  let component: MonitoringPendingComponent;
  let fixture: ComponentFixture<MonitoringPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitoringPendingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitoringPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

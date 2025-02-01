import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedDPSComponent } from './rejected-dps.component';

describe('RejectedDPSComponent', () => {
  let component: RejectedDPSComponent;
  let fixture: ComponentFixture<RejectedDPSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejectedDPSComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedDPSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivipolAvailabilityDateAddComponent } from './divipol-availability-date-add.component';

describe('DivipolAvailabilityDateAddComponent', () => {
  let component: DivipolAvailabilityDateAddComponent;
  let fixture: ComponentFixture<DivipolAvailabilityDateAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DivipolAvailabilityDateAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivipolAvailabilityDateAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

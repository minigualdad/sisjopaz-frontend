import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistanceScannerAllComponent } from './asistance-scanner-all.component';

describe('AsistanceScannerAllComponent', () => {
  let component: AsistanceScannerAllComponent;
  let fixture: ComponentFixture<AsistanceScannerAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsistanceScannerAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistanceScannerAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

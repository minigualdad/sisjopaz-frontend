import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistanceScannerBeneficiaryComponent } from './assistance-scanner-beneficiary.component';

describe('AssistanceScannerBeneficiaryComponent', () => {
  let component: AssistanceScannerBeneficiaryComponent;
  let fixture: ComponentFixture<AssistanceScannerBeneficiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistanceScannerBeneficiaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistanceScannerBeneficiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

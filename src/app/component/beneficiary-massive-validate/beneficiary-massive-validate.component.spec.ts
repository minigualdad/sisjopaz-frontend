import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryMassiveValidateComponent } from './beneficiary-massive-validate.component';

describe('BeneficiaryMassiveValidateComponent', () => {
  let component: BeneficiaryMassiveValidateComponent;
  let fixture: ComponentFixture<BeneficiaryMassiveValidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeneficiaryMassiveValidateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficiaryMassiveValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

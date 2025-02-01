import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryNoValidateProfessionalComponent } from './beneficiary-no-validate-professional.component';

describe('BeneficiaryNoValidateProfessionalComponent', () => {
  let component: BeneficiaryNoValidateProfessionalComponent;
  let fixture: ComponentFixture<BeneficiaryNoValidateProfessionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeneficiaryNoValidateProfessionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficiaryNoValidateProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

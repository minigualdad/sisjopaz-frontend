import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryNoValidateComponent } from './beneficiary-no-validate.component';

describe('BeneficiaryNoValidateComponent', () => {
  let component: BeneficiaryNoValidateComponent;
  let fixture: ComponentFixture<BeneficiaryNoValidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeneficiaryNoValidateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficiaryNoValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

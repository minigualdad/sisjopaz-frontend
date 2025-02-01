import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankCertificationValidateVerifyComponent } from './bank-certification-validate-verify.component';

describe('BankCertificationValidateVerifyComponent', () => {
  let component: BankCertificationValidateVerifyComponent;
  let fixture: ComponentFixture<BankCertificationValidateVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankCertificationValidateVerifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankCertificationValidateVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

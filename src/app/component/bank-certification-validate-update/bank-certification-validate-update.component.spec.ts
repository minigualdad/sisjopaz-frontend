import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankCertificationValidateUpdateComponent } from './bank-certification-validate-update.component';

describe('BankCertificationValidateUpdateComponent', () => {
  let component: BankCertificationValidateUpdateComponent;
  let fixture: ComponentFixture<BankCertificationValidateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankCertificationValidateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankCertificationValidateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

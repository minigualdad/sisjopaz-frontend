import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankCertificationNoValidateComponent } from './bank-certification-no-validate.component';

describe('BankCertificationNoValidateComponent', () => {
  let component: BankCertificationNoValidateComponent;
  let fixture: ComponentFixture<BankCertificationNoValidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankCertificationNoValidateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankCertificationNoValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

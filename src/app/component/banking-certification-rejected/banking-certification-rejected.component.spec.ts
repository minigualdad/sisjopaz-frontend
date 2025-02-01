import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankingCertificationRejectedComponent } from './banking-certification-rejected.component';

describe('BankingCertificationRejectedComponent', () => {
  let component: BankingCertificationRejectedComponent;
  let fixture: ComponentFixture<BankingCertificationRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankingCertificationRejectedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankingCertificationRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

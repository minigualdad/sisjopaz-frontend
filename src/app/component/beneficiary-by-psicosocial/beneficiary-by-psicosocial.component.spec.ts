import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryByPsicosocialComponent } from './beneficiary-by-psicosocial.component';

describe('BeneficiaryByPsicosocialComponent', () => {
  let component: BeneficiaryByPsicosocialComponent;
  let fixture: ComponentFixture<BeneficiaryByPsicosocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeneficiaryByPsicosocialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficiaryByPsicosocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

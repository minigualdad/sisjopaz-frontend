import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryMassiveGroupComponent } from './beneficiary-massive-group.component';

describe('BeneficiaryMassiveGroupComponent', () => {
  let component: BeneficiaryMassiveGroupComponent;
  let fixture: ComponentFixture<BeneficiaryMassiveGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeneficiaryMassiveGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficiaryMassiveGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryGroupComponent } from './beneficiary-group.component';

describe('BeneficiaryGroupComponent', () => {
  let component: BeneficiaryGroupComponent;
  let fixture: ComponentFixture<BeneficiaryGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeneficiaryGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficiaryGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

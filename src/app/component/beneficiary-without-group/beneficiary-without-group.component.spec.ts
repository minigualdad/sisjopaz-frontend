import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryWithoutGroupComponent } from './beneficiary-without-group.component';

describe('BeneficiaryWithoutGroupComponent', () => {
  let component: BeneficiaryWithoutGroupComponent;
  let fixture: ComponentFixture<BeneficiaryWithoutGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeneficiaryWithoutGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficiaryWithoutGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryAddGroupComponent } from './beneficiary-add-group.component';

describe('BeneficiaryAddGroupComponent', () => {
  let component: BeneficiaryAddGroupComponent;
  let fixture: ComponentFixture<BeneficiaryAddGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeneficiaryAddGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficiaryAddGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

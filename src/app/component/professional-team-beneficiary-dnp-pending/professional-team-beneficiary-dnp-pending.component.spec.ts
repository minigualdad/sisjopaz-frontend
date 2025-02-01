import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalTeamBeneficiaryDnpPendingComponent } from './professional-team-beneficiary-dnp-pending.component';

describe('ProfessionalTeamBeneficiaryDnpPendingComponent', () => {
  let component: ProfessionalTeamBeneficiaryDnpPendingComponent;
  let fixture: ComponentFixture<ProfessionalTeamBeneficiaryDnpPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalTeamBeneficiaryDnpPendingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalTeamBeneficiaryDnpPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

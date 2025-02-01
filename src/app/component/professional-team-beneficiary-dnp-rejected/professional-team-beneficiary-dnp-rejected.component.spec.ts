import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalTeamBeneficiaryDnpRejectedComponent } from './professional-team-beneficiary-dnp-rejected.component';

describe('ProfessionalTeamBeneficiaryDnpRejectedComponent', () => {
  let component: ProfessionalTeamBeneficiaryDnpRejectedComponent;
  let fixture: ComponentFixture<ProfessionalTeamBeneficiaryDnpRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalTeamBeneficiaryDnpRejectedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalTeamBeneficiaryDnpRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

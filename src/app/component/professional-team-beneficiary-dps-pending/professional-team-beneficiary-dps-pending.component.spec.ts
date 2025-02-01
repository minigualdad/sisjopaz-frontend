import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalTeamBeneficiaryDpsPendingComponent } from './professional-team-beneficiary-dps-pending.component';

describe('ProfessionalTeamBeneficiaryDpsPendingComponent', () => {
  let component: ProfessionalTeamBeneficiaryDpsPendingComponent;
  let fixture: ComponentFixture<ProfessionalTeamBeneficiaryDpsPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalTeamBeneficiaryDpsPendingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalTeamBeneficiaryDpsPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

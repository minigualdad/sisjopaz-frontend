import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalTeamBeneficiaryAcceptedComponent } from './professional-team-beneficiary-accepted.component';

describe('ProfessionalTeamBeneficiaryAcceptedComponent', () => {
  let component: ProfessionalTeamBeneficiaryAcceptedComponent;
  let fixture: ComponentFixture<ProfessionalTeamBeneficiaryAcceptedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalTeamBeneficiaryAcceptedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalTeamBeneficiaryAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalTeamBeneficiaryArnRejectedComponent } from './professional-team-beneficiary-arn-rejected.component';

describe('ProfessionalTeamBeneficiaryArnRejectedComponent', () => {
  let component: ProfessionalTeamBeneficiaryArnRejectedComponent;
  let fixture: ComponentFixture<ProfessionalTeamBeneficiaryArnRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalTeamBeneficiaryArnRejectedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalTeamBeneficiaryArnRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

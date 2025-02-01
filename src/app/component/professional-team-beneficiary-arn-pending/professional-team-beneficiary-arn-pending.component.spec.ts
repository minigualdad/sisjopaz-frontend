import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalTeamBeneficiaryArnPendingComponent } from './professional-team-beneficiary-arn-pending.component';

describe('ProfessionalTeamBeneficiaryArnPendingComponent', () => {
  let component: ProfessionalTeamBeneficiaryArnPendingComponent;
  let fixture: ComponentFixture<ProfessionalTeamBeneficiaryArnPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalTeamBeneficiaryArnPendingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalTeamBeneficiaryArnPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

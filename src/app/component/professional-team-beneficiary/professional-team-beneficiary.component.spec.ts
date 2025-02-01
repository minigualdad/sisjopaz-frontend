import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalTeamBeneficiaryComponent } from './professional-team-beneficiary.component';

describe('ProfessionalTeamBeneficiaryComponent', () => {
  let component: ProfessionalTeamBeneficiaryComponent;
  let fixture: ComponentFixture<ProfessionalTeamBeneficiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalTeamBeneficiaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalTeamBeneficiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

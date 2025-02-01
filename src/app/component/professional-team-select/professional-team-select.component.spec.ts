import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalTeamSelectComponent } from './professional-team-select.component';

describe('ProfessionalTeamSelectComponent', () => {
  let component: ProfessionalTeamSelectComponent;
  let fixture: ComponentFixture<ProfessionalTeamSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalTeamSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalTeamSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

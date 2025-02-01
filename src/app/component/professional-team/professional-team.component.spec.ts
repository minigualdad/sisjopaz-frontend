import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalTeamComponent } from './professional-team.component';

describe('ProfessionalTeamComponent', () => {
  let component: ProfessionalTeamComponent;
  let fixture: ComponentFixture<ProfessionalTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalTeamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

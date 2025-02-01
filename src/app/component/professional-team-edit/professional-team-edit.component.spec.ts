import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalTeamEditComponent } from './professional-team-edit.component';

describe('ProfessionalTeamEditComponent', () => {
  let component: ProfessionalTeamEditComponent;
  let fixture: ComponentFixture<ProfessionalTeamEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalTeamEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalTeamEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

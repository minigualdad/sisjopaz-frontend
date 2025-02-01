import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalTeamAddComponent } from './professional-team-add.component';

describe('ProfessionalTeamAddComponent', () => {
  let component: ProfessionalTeamAddComponent;
  let fixture: ComponentFixture<ProfessionalTeamAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalTeamAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalTeamAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

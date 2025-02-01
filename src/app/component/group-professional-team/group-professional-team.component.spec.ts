import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupProfessionalTeamComponent } from './group-professional-team.component';

describe('GroupProfessionalTeamComponent', () => {
  let component: GroupProfessionalTeamComponent;
  let fixture: ComponentFixture<GroupProfessionalTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupProfessionalTeamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupProfessionalTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

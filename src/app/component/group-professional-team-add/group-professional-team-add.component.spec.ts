import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupProfessionalTeamAddComponent } from './group-professional-team-add.component';

describe('GroupProfessionalTeamAddComponent', () => {
  let component: GroupProfessionalTeamAddComponent;
  let fixture: ComponentFixture<GroupProfessionalTeamAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupProfessionalTeamAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupProfessionalTeamAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

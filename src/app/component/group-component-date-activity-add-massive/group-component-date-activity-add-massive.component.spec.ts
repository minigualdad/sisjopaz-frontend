import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupComponentDateActivityAddMassiveComponent } from './group-component-date-activity-add-massive.component';

describe('GroupComponentDateActivityAddMassiveComponent', () => {
  let component: GroupComponentDateActivityAddMassiveComponent;
  let fixture: ComponentFixture<GroupComponentDateActivityAddMassiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupComponentDateActivityAddMassiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupComponentDateActivityAddMassiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

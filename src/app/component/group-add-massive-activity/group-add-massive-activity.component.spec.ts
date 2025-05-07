import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAddMassiveActivityComponent } from './group-add-massive-activity.component';

describe('GroupAddMassiveActivityComponent', () => {
  let component: GroupAddMassiveActivityComponent;
  let fixture: ComponentFixture<GroupAddMassiveActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupAddMassiveActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupAddMassiveActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

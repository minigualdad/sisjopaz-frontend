import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupScheduleAddComponent } from './group-schedule-add.component';

describe('GroupScheduleAddComponent', () => {
  let component: GroupScheduleAddComponent;
  let fixture: ComponentFixture<GroupScheduleAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupScheduleAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupScheduleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

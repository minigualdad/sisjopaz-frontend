import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCycleComponent } from './group-cycle.component';

describe('GroupCycleComponent', () => {
  let component: GroupCycleComponent;
  let fixture: ComponentFixture<GroupCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupCycleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

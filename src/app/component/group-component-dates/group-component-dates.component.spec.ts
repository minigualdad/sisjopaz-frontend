import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupComponentDatesComponent } from './group-component-dates.component';

describe('GroupComponentDatesComponent', () => {
  let component: GroupComponentDatesComponent;
  let fixture: ComponentFixture<GroupComponentDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupComponentDatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupComponentDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

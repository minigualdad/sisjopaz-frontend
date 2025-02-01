import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupScheduleBeneficiaryAddComponent } from './group-schedule-beneficiary-add.component';

describe('GroupScheduleBeneficiaryAddComponent', () => {
  let component: GroupScheduleBeneficiaryAddComponent;
  let fixture: ComponentFixture<GroupScheduleBeneficiaryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupScheduleBeneficiaryAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupScheduleBeneficiaryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

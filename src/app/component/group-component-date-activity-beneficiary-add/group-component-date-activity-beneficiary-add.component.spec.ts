import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupComponentDateActivityBeneficiaryAddComponent } from './group-component-date-activity-beneficiary-add.component';

describe('GroupComponentDateActivityBeneficiaryAddComponent', () => {
  let component: GroupComponentDateActivityBeneficiaryAddComponent;
  let fixture: ComponentFixture<GroupComponentDateActivityBeneficiaryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupComponentDateActivityBeneficiaryAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupComponentDateActivityBeneficiaryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

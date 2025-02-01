import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupComponentDateActivityBeneficiaryComponent } from './group-component-date-activity-beneficiary.component';

describe('GroupComponentDateActivityBeneficiaryComponent', () => {
  let component: GroupComponentDateActivityBeneficiaryComponent;
  let fixture: ComponentFixture<GroupComponentDateActivityBeneficiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupComponentDateActivityBeneficiaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupComponentDateActivityBeneficiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

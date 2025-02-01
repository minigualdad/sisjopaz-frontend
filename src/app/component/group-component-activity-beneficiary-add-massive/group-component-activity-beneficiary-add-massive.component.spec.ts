import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupComponentActivityBeneficiaryAddMassiveComponent } from './group-component-activity-beneficiary-add-massive.component';

describe('GroupComponentActivityBeneficiaryAddMassiveComponent', () => {
  let component: GroupComponentActivityBeneficiaryAddMassiveComponent;
  let fixture: ComponentFixture<GroupComponentActivityBeneficiaryAddMassiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupComponentActivityBeneficiaryAddMassiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupComponentActivityBeneficiaryAddMassiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

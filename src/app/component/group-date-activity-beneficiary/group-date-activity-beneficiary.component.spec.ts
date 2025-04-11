import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDateActivityBeneficiaryComponent } from './group-date-activity-beneficiary.component';

describe('GroupDateActivityBeneficiaryComponent', () => {
  let component: GroupDateActivityBeneficiaryComponent;
  let fixture: ComponentFixture<GroupDateActivityBeneficiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupDateActivityBeneficiaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupDateActivityBeneficiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

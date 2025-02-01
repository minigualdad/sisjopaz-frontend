import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupScheduleBeneficiaryComponent } from './group-schedule-beneficiary.component';

describe('GroupScheduleBeneficiaryComponent', () => {
  let component: GroupScheduleBeneficiaryComponent;
  let fixture: ComponentFixture<GroupScheduleBeneficiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupScheduleBeneficiaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupScheduleBeneficiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

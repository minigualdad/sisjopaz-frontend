import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupBeneficiaryComponent } from './group-beneficiary.component';

describe('GroupBeneficiaryComponent', () => {
  let component: GroupBeneficiaryComponent;
  let fixture: ComponentFixture<GroupBeneficiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupBeneficiaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupBeneficiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

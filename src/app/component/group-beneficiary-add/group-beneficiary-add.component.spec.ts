import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupBeneficiaryAddComponent } from './group-beneficiary-add.component';

describe('GroupBeneficiaryAddComponent', () => {
  let component: GroupBeneficiaryAddComponent;
  let fixture: ComponentFixture<GroupBeneficiaryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupBeneficiaryAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupBeneficiaryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

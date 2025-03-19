import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRegionalBeneficiaryMassiveGroupComponent } from './my-regional-beneficiary-massive-group.component';

describe('MyRegionalBeneficiaryMassiveGroupComponent', () => {
  let component: MyRegionalBeneficiaryMassiveGroupComponent;
  let fixture: ComponentFixture<MyRegionalBeneficiaryMassiveGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRegionalBeneficiaryMassiveGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyRegionalBeneficiaryMassiveGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRegionalBeneficiaryWithoutGroupComponent } from './my-regional-beneficiary-without-group.component';

describe('MyRegionalBeneficiaryWithoutGroupComponent', () => {
  let component: MyRegionalBeneficiaryWithoutGroupComponent;
  let fixture: ComponentFixture<MyRegionalBeneficiaryWithoutGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRegionalBeneficiaryWithoutGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyRegionalBeneficiaryWithoutGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

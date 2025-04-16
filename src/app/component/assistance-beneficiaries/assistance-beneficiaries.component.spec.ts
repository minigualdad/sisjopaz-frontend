import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistanceBeneficiariesComponent } from './assistance-beneficiaries.component';

describe('AssistanceBeneficiariesComponent', () => {
  let component: AssistanceBeneficiariesComponent;
  let fixture: ComponentFixture<AssistanceBeneficiariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistanceBeneficiariesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistanceBeneficiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistanceBeneficiariesDateSelectorComponent } from './assistance-beneficiaries-date-selector.component';

describe('AssistanceBeneficiariesDateSelectorComponent', () => {
  let component: AssistanceBeneficiariesDateSelectorComponent;
  let fixture: ComponentFixture<AssistanceBeneficiariesDateSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistanceBeneficiariesDateSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistanceBeneficiariesDateSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

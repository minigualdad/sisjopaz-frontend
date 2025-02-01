import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoresponsabilityAgreementComponent } from './coresponsability-agreement.component';

describe('CoresponsabilityAgreementComponent', () => {
  let component: CoresponsabilityAgreementComponent;
  let fixture: ComponentFixture<CoresponsabilityAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoresponsabilityAgreementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoresponsabilityAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

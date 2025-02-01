import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoresponsabilityAgreementMasiveComponent } from './coresponsability-agreement-masive.component';

describe('CoresponsabilityAgreementMasiveComponent', () => {
  let component: CoresponsabilityAgreementMasiveComponent;
  let fixture: ComponentFixture<CoresponsabilityAgreementMasiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoresponsabilityAgreementMasiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoresponsabilityAgreementMasiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

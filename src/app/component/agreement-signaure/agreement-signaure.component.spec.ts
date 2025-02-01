import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementSignaureComponent } from './agreement-signaure.component';

describe('AgreementSignaureComponent', () => {
  let component: AgreementSignaureComponent;
  let fixture: ComponentFixture<AgreementSignaureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgreementSignaureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgreementSignaureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

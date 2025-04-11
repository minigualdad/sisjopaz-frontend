import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReportErrorIaComponent } from './modal-report-error-ia.component';

describe('ModalReportErrorIaComponent', () => {
  let component: ModalReportErrorIaComponent;
  let fixture: ComponentFixture<ModalReportErrorIaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalReportErrorIaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalReportErrorIaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

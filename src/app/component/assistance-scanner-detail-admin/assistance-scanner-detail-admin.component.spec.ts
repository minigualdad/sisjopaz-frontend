import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistanceScannerDetailAdminComponent } from './assistance-scanner-detail-admin.component';

describe('AssistanceScannerDetailAdminComponent', () => {
  let component: AssistanceScannerDetailAdminComponent;
  let fixture: ComponentFixture<AssistanceScannerDetailAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistanceScannerDetailAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistanceScannerDetailAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistanceScannerDetailComponent } from './assistance-scanner-detail.component';

describe('AssistanceScannerByUserComponent', () => {
  let component: AssistanceScannerDetailComponent;
  let fixture: ComponentFixture<AssistanceScannerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistanceScannerDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistanceScannerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

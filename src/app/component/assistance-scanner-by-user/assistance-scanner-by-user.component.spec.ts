import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistanceScannerByUserComponent } from './assistance-scanner-by-user.component';

describe('AssistanceScannerByUserComponent', () => {
  let component: AssistanceScannerByUserComponent;
  let fixture: ComponentFixture<AssistanceScannerByUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistanceScannerByUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistanceScannerByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

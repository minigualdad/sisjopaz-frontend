import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesAssistanceScannerComponentsComponent } from './images-assistance-scanner-components.component';

describe('ImagesAssistanceScannerComponentsComponent', () => {
  let component: ImagesAssistanceScannerComponentsComponent;
  let fixture: ComponentFixture<ImagesAssistanceScannerComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagesAssistanceScannerComponentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagesAssistanceScannerComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

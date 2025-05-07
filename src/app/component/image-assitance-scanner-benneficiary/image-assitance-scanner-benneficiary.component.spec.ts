import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageAssitanceScannerBenneficiaryComponent } from './image-assitance-scanner-benneficiary.component';

describe('ImageAssitanceScannerBenneficiaryComponent', () => {
  let component: ImageAssitanceScannerBenneficiaryComponent;
  let fixture: ComponentFixture<ImageAssitanceScannerBenneficiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageAssitanceScannerBenneficiaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageAssitanceScannerBenneficiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

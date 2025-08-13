import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadDataBeneficiaryComponent } from './download-data-beneficiary.component';

describe('DownloadDataBeneficiaryComponent', () => {
  let component: DownloadDataBeneficiaryComponent;
  let fixture: ComponentFixture<DownloadDataBeneficiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadDataBeneficiaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadDataBeneficiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

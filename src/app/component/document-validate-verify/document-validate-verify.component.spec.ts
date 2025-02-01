import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentValidateVerifyComponent } from './document-validate-verify.component';

describe('DocumentValidateVerifyComponent', () => {
  let component: DocumentValidateVerifyComponent;
  let fixture: ComponentFixture<DocumentValidateVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentValidateVerifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentValidateVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

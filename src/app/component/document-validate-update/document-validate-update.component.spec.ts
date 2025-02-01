import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentValidateUpdateComponent } from './document-validate-update.component';

describe('DocumentValidateUpdateComponent', () => {
  let component: DocumentValidateUpdateComponent;
  let fixture: ComponentFixture<DocumentValidateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentValidateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentValidateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

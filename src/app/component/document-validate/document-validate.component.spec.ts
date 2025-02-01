import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentValidateComponent } from './document-validate.component';

describe('DocumentValidateComponent', () => {
  let component: DocumentValidateComponent;
  let fixture: ComponentFixture<DocumentValidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentValidateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

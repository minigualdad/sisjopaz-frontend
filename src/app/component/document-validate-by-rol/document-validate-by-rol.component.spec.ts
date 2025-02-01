import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentValidateByRolComponent } from './document-validate-by-rol.component';

describe('DocumentValidateByRolComponent', () => {
  let component: DocumentValidateByRolComponent;
  let fixture: ComponentFixture<DocumentValidateByRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentValidateByRolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentValidateByRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

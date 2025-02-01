import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistanceUploadComponent } from './assistance-upload.component';

describe('AssistanceUploadComponent', () => {
  let component: AssistanceUploadComponent;
  let fixture: ComponentFixture<AssistanceUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistanceUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistanceUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistanceUploadsFixComponent } from './assistance-uploads-fix.component';

describe('AssistanceUploadsFixComponent', () => {
  let component: AssistanceUploadsFixComponent;
  let fixture: ComponentFixture<AssistanceUploadsFixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistanceUploadsFixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistanceUploadsFixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

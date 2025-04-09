import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistanceEditComponent } from './assistance-edit.component';

describe('AssistanceEditComponent', () => {
  let component: AssistanceEditComponent;
  let fixture: ComponentFixture<AssistanceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistanceEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistanceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

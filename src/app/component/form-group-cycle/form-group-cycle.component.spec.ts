import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroupCycleComponent } from './form-group-cycle.component';

describe('FormGroupCycleComponent', () => {
  let component: FormGroupCycleComponent;
  let fixture: ComponentFixture<FormGroupCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormGroupCycleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormGroupCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

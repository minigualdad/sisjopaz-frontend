import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSelectDateComponent } from './form-select-date.component';

describe('FormSelectDateComponent', () => {
  let component: FormSelectDateComponent;
  let fixture: ComponentFixture<FormSelectDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSelectDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSelectDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

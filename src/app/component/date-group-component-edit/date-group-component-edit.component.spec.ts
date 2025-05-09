import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateGroupComponentEditComponent } from './date-group-component-edit.component';

describe('DateGroupComponentEditComponent', () => {
  let component: DateGroupComponentEditComponent;
  let fixture: ComponentFixture<DateGroupComponentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateGroupComponentEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateGroupComponentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
